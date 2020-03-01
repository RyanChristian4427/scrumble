use crate::db::{
    auth_repository::{self, UserCreationError},
    Conn,
};
use crate::models::user::{InsertableUser, User, UserCredentials};
use crate::services::service_tracer;

use crypto::scrypt::{self, ScryptParams};
use rustracing_jaeger::Span;

pub fn register(
    mut user: InsertableUser,
    conn: Conn,
    span: &Span,
) -> Result<User, UserCreationError> {
    let span = service_tracer()
        .span("POST Register User")
        .child_of(span)
        .start();

    user.password = scrypt::scrypt_simple(user.password.as_ref(), &ScryptParams::new(14, 8, 1))
        .expect("hash error");
    auth_repository::register(user, conn, &span)
}

pub fn login(credentials: UserCredentials, conn: Conn, span: &Span) -> Option<User> {
    let span = service_tracer()
        .span("Post Login User")
        .child_of(span)
        .start();

    let user = auth_repository::login(credentials.email, conn, &span);
    match user {
        Some(user) => {
            let password_matches =
                scrypt::scrypt_check(credentials.password.as_ref(), user.hashed_password.as_ref())
                    .map_err(|err| eprintln!("login_user: scrypt_check: {}", err))
                    .ok()?;

            if password_matches {
                Some(user)
            } else {
                None
            }
        }
        None => None,
    }
}
