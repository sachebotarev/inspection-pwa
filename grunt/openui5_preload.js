module.exports =  function(grunt, config) {
    return {
        component: {
            options: {
                resources: {
                    cwd: "<%= dir.src %>",
                    prefix: "<%= project.prefix %>",
                    src: [
                        "Component.js",
                        "**/*.js",
                        "**/*.fragment.xml",
                        "**/*.view.xml",
                        "**/*.properties",
                        "manifest.json",
                        "!Component-preload.js",
                        "!test/**",
                        "!openui5/**"
                    ]
                },
                dest:  "<%= dir.dist %>"
            },
            components: true,
            compress: true
        }
    }
};