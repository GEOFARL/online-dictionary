import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";

import { type Middleware } from "~/libs/types/types.js";

class AuthenticateMiddleware implements Middleware {
	private cookieExtractor = (req) => {
		let token = null;
		if (req && req.cookies) {
			token = req.cookies.token;
		}
		return token;
	};

	private secret: string;

	public constructor({ secret }: { secret: string }) {
		this.secret = secret;
	}

	private get jwtStrategy() {
		return new JwtStrategy(
			{
				jwtFromRequest: this.cookieExtractor,
				secretOrKey: this.secret,
			},
			(payload, done) => {
				done(null, { user: "hi there " });
			},
		);
	}

	public init() {
		passport.use(this.jwtStrategy);
	}

	public requiresAuth() {
		return passport.authenticate("jwt", { session: false });
	}

	public get name() {
		return "authenticate";
	}
}

export { AuthenticateMiddleware };
