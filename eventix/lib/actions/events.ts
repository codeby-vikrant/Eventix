"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getSession } from "../auth/server"
import { prisma } from "../prisma"
import { RsvpStatus } from "@/app/generated/prisma/enums"

async function requireUserId() {
    const session = await getSession()
    const userId = session.data?.user.id

    if (!userId) {
        redirect("/auth/sign-in")
    }

    return userId
}

function parseOptionalEventDate(value: string) {
    if (!value.length) {
        return null
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        throw new Error("Please Enter A Valid Event Date")
    }

    return date
}

function parseCreateEvent(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim()
    if (title.length < 3 || title.length > 120) {
        throw new Error("Title Must Be Between 3 and 120 Characters")
    }

    const description = String(formData.get("description") ?? "").trim()
    const location = String(formData.get("location") ?? "").trim()
    const eventDate = String(formData.get("eventDate") ?? "").trim()

    return {
        title,
        description: description.length ? description.slice(0, 2000) : null,
        location: location.length ? location.slice(0, 200) : null,
        eventDate: parseOptionalEventDate(eventDate)
    }
}

const RSVP_STATUSES = ["going", "maybe", "not_going"] as const

function isRsvpStatus(s: string): s is RsvpStatus {
    return (RSVP_STATUSES as readonly string[]).includes(s)
}

function parseRsvp(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim()
    if (name.length < 2 || name.length > 120) {
        throw new Error("Name Must Be Between 2 and 120 Characters")
    }
    const email = String(formData.get("email") ?? "").trim()
    if (email.length < 3 || email.length > 320 || !email.includes("@")) {
        throw new Error("Please Enter A Valid Email")
    }
    const status = String(formData.get("status") ?? "").trim()
    if (!isRsvpStatus(status)) {
        throw new Error("Invalid RSVP status")
    }
    return { name, email, status }
}

export async function createEventAction(formData: FormData) {
    const userId = await requireUserId()
    const input = parseCreateEvent(formData)
    const created = await prisma.event.create({
        data: {
            ownerUserId: userId,
            title: input.title,
            description: input.description,
            location: input.location,
            eventDate: input.eventDate
        }
    })
    revalidatePath("/dashboard")
    redirect(`/events/${created.id}`)
}

export async function createInviteLinkAction(eventId: string) {
    const userId = await requireUserId()
    const owns = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: { id: true }
    })
    if (!owns) {
        throw new Error("Event Not Found")
    }

    await prisma.eventInvite.upsert({
        where: { eventId },
        create: { eventId, token: crypto.randomUUID().replace(/-/g, "") },
        update: {}
    })
    revalidatePath(`/events/${eventId}`)
    redirect(`/events/${eventId}?invite=ready`)
}

export async function submitOrUpdateRsvpAction(token: string, formData: FormData) {
    const input = parseRsvp(formData)
    const invite = await prisma.eventInvite.findFirst({
        where: { token },
        select: {
            id: true,
            event: {
                select: {
                    id: true
                }
            }
        }
    })
    if (!invite) {
        throw new Error("Invite Link Is Invalid")
    }
    const eventId = invite.event.id
    const emailNormalized = input.email.toLowerCase()

    await prisma.eventRsvp.upsert({
        where: {
            eventId_emailNormalized: {
                eventId, emailNormalized
            }
        },
        create: {
            eventId,
            inviteId: invite.id,
            name: input.name,
            email: input.email,
            emailNormalized,
            status: input.status as RsvpStatus
        },
        update: {
            name: input.name,
            email: input.email,
            status: input.status as RsvpStatus,
            respondedAt: new Date()
        }
    })
    revalidatePath(`/events/${eventId}`)
    redirect(`/invite/${token}?submitted=1`)
}
