mod pomo;

#[macro_use]
extern crate rocket;
use pomo::Pomo;
use ws::{Stream, WebSocket};

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/yert")]
fn yert(ws: WebSocket) -> ws::Channel<'static> {
    use rocket::futures::{SinkExt, StreamExt};

    ws.channel(move |mut stream| {
        Box::pin(async move {
            while let Some(message) = stream.next().await {
                let _ = stream.send(message?).await;
            }

            Ok(())
        })
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index, yert])
}
