const BASE_URL = "https://playground.4geeks.com/apis/fake/contact";
export const AGENDA_SLUG = "agenda_de_jonathan";

async function http(url, options = {}) {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} on ${url} :: ${text}`);
    }
    try { return await res.json(); } catch { return null; }
}

export async function ensureAgenda(slug = AGENDA_SLUG) {
    try {
        return await http(`${BASE_URL}/agenda/${encodeURIComponent(slug)}`);
    } catch {
        return await http(`${BASE_URL}/agendas`, {
            method: "POST",
            body: JSON.stringify({ slug }),
        });
    }
}

export async function getContacts(slug = AGENDA_SLUG) {
    await ensureAgenda(slug);
    const data = await http(`${BASE_URL}/agenda/${encodeURIComponent(slug)}`);
    return Array.isArray(data?.contacts) ? data.contacts : [];
}

export async function addContact(payload, slug = AGENDA_SLUG) {
    const body = { ...payload, agenda_slug: slug };
    return await http(`${BASE_URL}/contacts`, {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export async function editContact(id, updates) {
    return await http(`${BASE_URL}/contact/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}

export async function deleteContact(id) {
    return await http(`${BASE_URL}/contact/${id}`, { method: "DELETE" });
}
