import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";

import { type JsonWebToken } from "~/libs/modules/jsonwebtoken/jsonwebtoken.js";
import { type Middleware } from "~/libs/types/types.js";
import { type AuthService } from "~/modules/auth/auth.service.js";

class AuthenticateMiddleware implements Middleware {
	private authService: AuthService;

	private cookieExtractor = (req) => {
		let token = null;
		if (req && req.cookies) {
			token = req.cookies.token;
		}
		return token;
	};

	private secret: string;

	public constructor({
		authService,
		secret,
	}: {
		authService: AuthService;
		jsonWebToken: JsonWebToken;
		secret: string;
	}) {
		this.authService = authService;
		this.secret = secret;
	}

	private get jwtStrategy() {
		return new JwtStrategy(
			{
				jwtFromRequest: this.cookieExtractor,
				secretOrKey: this.secret,
			},
			async (payload, done) => {
				try {
					const user = await this.authService.findUserById(payload);
					done(null, { user });
				} catch (error) {
					done(error);
				}
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
