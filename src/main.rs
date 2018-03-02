extern crate hyper;
extern crate pony;
use std::env;
use hyper::server::{NewService,Http};
use pony::pony_builder::{PonyBuilder};

fn main() {
    let addr = "127.0.0.1:4444".parse().unwrap();
    let mut pb = PonyBuilder::new();
    let mut cwd = env::current_exe().expect("unable to get current exe");
    cwd.pop();
    let cwd_str = cwd.to_string_lossy();
    println!("starting from {:?}", cwd_str);
    pb.use_static(&(cwd_str + "/../../www/"));
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
            "otf"]);
    let h = Http::new().bind(&addr, move || pb.new_service()).expect("Unable to start server on 4444");
    println!("Listening on 4444");
    let _ = h.run().expect("Unable to start server on 4444");
    println!("Exiting server");
}