const versionHelper = require('./scripts/run-with-version');
// Values in package.json are not read, so import explicitly.
const pkg = require('./package.json');

const config = {
  publish: [
      'github'
  ],
  productName: pkg.build.productName,
  appId: pkg.build.appId,
  artifactName: 'Sensotrend Uploader-${version}.${ext}',
  directories: {
    buildResources: 'resources',
    output: 'release'
  },
  afterSign: 'scripts/notarize.js',
  dmg: {
    contents: [
      {
        x: 381,
        y: 190,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 159,
        y: 190,
        type: 'file'
      }
    ],
    background: 'resources/background.tiff'
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowElevation: true
  },
  files: [
    'dist/',
    'node_modules/',
    'resources/',
    'app.html',
    'about.html',
    'main.prod.js',
    'main.prod.js.map',
    'package.json'
  ],
  extraResources: [
    {
      from: 'resources/${os}',
      to: 'driver/',
      filter: [
        '**/*',
        '!*.md'
      ]
    },
    'sounds/',
    'locales/'
  ],
  win: {
    target: [
      {
        target: 'nsis',
        arch: [
          'ia32',
          'x64'
        ]
      },
      {
        target: 'zip',
        arch: [
          'ia32',
          'x64'
        ]
      }
    ],
    publisherName: [
      'Sensotrend Oy'
    ],
    rfc3161TimeStampServer: 'http://timestamp.digicert.com'
  },
  mac: {
    category: 'public.app-category.tools',
    entitlements: 'resources/mac/entitlements.mac.plist',
    entitlementsInherit: 'resources/mac/entitlements.mac.plist',
    target: [
      {
        target: 'zip',
        arch: [
          'x64'
        ]
      },
      {
        target: 'dmg',
        arch: [
          'x64'
        ]
      },
      'dir'
    ]
  },
  linux: {
    target: ['AppImage'],
    category: 'Utility',
  }
};

const {channel} = versionHelper.resolveVersion();

if (channel !== 'unknown') {
  config.publish = [
    {
      provider: 'generic',
      url: 'https://www.sensotrend.fi/download/uploader/update/${os}/',
      channel: channel,
    },
  ];
}

module.exports = config;
