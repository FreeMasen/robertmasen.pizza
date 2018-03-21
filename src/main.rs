extern crate hyper;
extern crate pony;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate lettre;
extern crate serde_json;
extern crate futures;
use std::env;
use hyper::server::{NewService, Http, Request, Response};
use hyper::header::{ContentLength,};
use hyper::{StatusCode};
use pony::pony_builder::{PonyBuilder};
use lettre::{SimpleSendableEmail, EmailTransport, EmailAddress, SmtpTransport};
use std::time::{SystemTime, UNIX_EPOCH};
use futures::stream::Stream;
use futures::Future;

fn main() {
    let addr = "127.0.0.1:4444".parse().unwrap();
    let mut pb = PonyBuilder::new();

    pb.use_static("www/");
    pb.post("/contact", contact);
    pb.set_know_extensions(&["html",
                            "js",
                            "css",
                            "ico",
                            "jpg",
                            "png",
                            "woff2",
                            "ttf",
                            "txt",
                            "xml",
                            "rss",
                            "svg",
                            "txt",
                            "gif",
                            "map",
                            "otf",
                            "ttf"]);
    let h = Http::new().bind(&addr, move || pb.new_service()).expect("Unable to start server on 4444");
    println!("Listening on 4444");
    let _ = h.run().expect("Unable to start server on 4444");
    println!("Exiting server");
}

#[derive(Serialize, Deserialize)]
struct Email {
    name: String,
    address: String,
    message: String,
}

fn contact(req: Request) -> Box<futures::Future<Error=hyper::Error, Item=hyper::Response>> {
    Box::new(
        req.body().concat2().map(|b| {
            let msg = if let Ok(m) = serde_json::from_slice::<Email>(b.as_ref()) {
                m
            } else {
                let msg = "Unable to parse json";
                return Response::new()
                        .with_status(StatusCode::UnprocessableEntity)
                        .with_header(ContentLength(msg.len() as u64))
                        .with_body(msg);
            };
            match send(msg) {
                Ok(body) => Response::new()
                                .with_header(ContentLength(body.len() as u64))
                                .with_body(body),
                Err(body) => Response::new()
                                .with_status(StatusCode::InternalServerError)
                                .with_header(ContentLength(body.len() as u64))
                                .with_body(body)
            }
        })
    )
}

fn send(email: Email) -> Result<String, String> {
    let body = format!("name: {:?}\n\nemail: {:?}\n\nmessage\n----------\n{:?}",
                email.name,
                email.address,
                email.message);
    let msg = SimpleSendableEmail::new(
                EmailAddress::new("rfm@robertmasen.pizza".to_string()),
                vec![EmailAddress::new("r.f.masen@gmail.com".to_string())],
                format!("{:?}", SystemTime::now()
                                .duration_since(UNIX_EPOCH)
                                .expect("unable to capture timestamp")
                                .as_secs()),
                body,
            );

    // Open a local connection on port 25
    let mut mailer =
        SmtpTransport::builder_unencrypted_localhost().unwrap().build();
    // Send the email
    match mailer.send(&msg) {
        Ok(_) => Ok(String::from("Sent message successfully")),
        Err(e) => {
            println!("{:?}", e);
            Err(String::from("Error sending mail"))
        },
    }
}