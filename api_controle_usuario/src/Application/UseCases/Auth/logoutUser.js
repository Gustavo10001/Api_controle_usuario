class LogoutUser {
    /**
     * @param {ITokenBlacklistRepository} tokenBlacklistRepository 
     * @param {JWTProvider} jwtProvider 
     */
    constructor(tokenBlacklistRepository, jwtProvider) {
        this.tokenBlacklistRepository = tokenBlacklistRepository;
        this.jwtProvider = jwtProvider;
    }

    /**

     @param {string} token 
     */
    
    async execute(token) {
    try {
        const decoded = this.jwtProvider.verifyToken(token);
        if (!decoded) {
            throw new Error('Invalid token');
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const expiresIn = decoded.exp - currentTime;

        if (expiresIn > 0) {
            await this.tokenBlacklistRepository.add(token, expiresIn);
        }

        return { message: 'Logout successful' };
    } catch (error) {
        throw new Error('Failed to logout');
    }
}
}

module.exports = LogoutUser;