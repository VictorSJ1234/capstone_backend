const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API key is missing' });
    }

    // Sample list of valid API keys
    const validApiKeys = ['pasigdtf', 'innogeeksftw', 'rjleerobrc'];

    // Check if the provided API key is in the list of valid keys
    if (!validApiKeys.includes(apiKey)) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    next();
};

module.exports = apiKeyMiddleware;
