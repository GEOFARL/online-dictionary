import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";

import { type JsonWebToken } from "~/libs/modules/jsonwebtoken/jsonwebtoken.js";
import { type Middleware } from "~/libs/types/types.js";
import { type UserService } from "~/modules/user/user.service.js";

class AuthenticateMiddleware implements Middleware {
	private cookieExtractor = (req) => {
		let token = null;
		if (req && req.cookies) {
			token = req.cookies.token;
		}
		return token;
	};

	private secret: string;

	private userService: UserService;

	public constructor({
		secret,
		userService,
	}: {
		jsonWebToken: JsonWebToken;
		secret: string;
		userService: UserService;
	}) {
		this.userService = userService;
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
					const user = await this.userService.findById(payload);
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
