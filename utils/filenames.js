export async function HashFilename(fname) {
    const fileExtension = fname.split(".").pop();
    const hashBuf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(fname))
    const hashString = Array.from(new Uint8Array(hashBuf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    return `${hashString}.${fileExtension}`
}
