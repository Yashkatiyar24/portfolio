const domainSlugs = {
    'AI/ML Projects': 'ai-ml',
    'Android Development': 'android',
    'iOS Development': 'ios',
    'Mobile Development': 'mobile',
    'Full Stack Web': 'full-stack',
    'AI Agents': 'ai-agents'
};

const slugToDomain = {};
for (const [domain, slug] of Object.entries(domainSlugs)) {
    slugToDomain[slug] = domain;
}

class Router {
    constructor() {
        this.routes = [];
        this._bindHashChange();
    }

    _bindHashChange() {
        window.addEventListener('hashchange', () => this._handle());
    }

    register(pattern, handler) {
        this.routes.push({ pattern, handler });
    }

    navigate(path) {
        const hash = `#${path}`;
        if (window.location.hash !== hash) {
            window.location.hash = path;
        }
    }

    back() {
        window.history.back();
    }

    getPath() {
        return window.location.hash.slice(1) || '/';
    }

    start() {
        this._handle();
    }

    _handle() {
        const path = this.getPath();

        for (const route of this.routes) {
            const params = this._match(route.pattern, path);
            if (params !== null) {
                route.handler(params);
                return;
            }
        }

        this.navigate('/');
    }

    _match(pattern, path) {
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');

        if (patternParts.length !== pathParts.length) return null;

        const params = {};
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
            } else if (patternParts[i] !== pathParts[i]) {
                return null;
            }
        }

        return params;
    }
}
