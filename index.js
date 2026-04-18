export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === "/") {
      return new Response(
        `
        <h1>Cloudflare Worker API</h1>
        <p>Uporabi naslednje poti:</p>
        <ul>
          <li>/api/time</li>
          <li>/api/hello?name=Ana</li>
          <li>/api/student</li>
          <li>/api/quote</li>
          <li>/api/timezone</li>
          
        </ul>
        `,
        { headers: { "content-type": "text/html" } }
      )
    }

    if (url.pathname === "/api/time") {
      return Response.json({
        time: new Date().toISOString()
      })
    }

    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name") || "guest"
      return Response.json({
        message: `Hello ${name}`
      })
    }

    if (url.pathname === "/api/student") {
      return Response.json({
        name: "Nik Jovan",
        program: "Višja računalniška šola",
        course: "Upravljanje oblačnih storitev"
      })
    }

  if (url.pathname === "/api/quote") {
    try {
      const res = await fetch("https://zenquotes.io/api/random")
      const data = await res.json()

      return Response.json({
        quote: data[0].q,
        author: data[0].a
      })
    } catch (e) {
      return Response.json(
        { error: "Quote API error" },
        { status: 500 }
      )
    }
  }

  if (url.pathname === "/api/timezone") {
  try {
    const timezone = url.searchParams.get("tz") || "Europe/Ljubljana"

    const res = await fetch(
      `https://timeapi.io/api/time/current/zone?timeZone=${encodeURIComponent(timezone)}`
    )
    const data = await res.json()

    return Response.json({
      timezone: data.timeZone,
      date: data.date,
      time: data.time,
      dayOfWeek: data.dayOfWeek,
      dateTime: data.dateTime
    })
  } catch (e) {
    return Response.json(
      { error: "Timezone API error" },
      { status: 500 }
    )
  }
}

    return new Response("Not found", { status: 404 })
  }
}
