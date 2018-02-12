module.exports = {
    'default': ['eslint', 'connect:src','open:src', 'watch'],
    'local': ['eslint', 'openui5_connect:src', 'open:src', 'watch'],
    'build': ['eslint', 'clear', 'copy', 'openui5_preload', 'open:dist', 'openui5_connect:dist'],
    'clear': ['clean'],
    'lint': ['eslint']
};