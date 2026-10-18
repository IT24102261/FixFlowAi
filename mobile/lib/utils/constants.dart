class AppConstants {
  static const _envUrl = String.fromEnvironment('API_BASE_URL');
  static const deployedApiUrl = 'https://backend1-2-aqau.onrender.com';

  /// Local development endpoint; use --dart-define=API_BASE_URL=... to select it.
  static const wifiApiUrl = 'http://192.168.1.26:5080';

  /// PC Ethernet address, USB reverse, and emulator fallbacks.
  static const apiCandidates = [
    wifiApiUrl,
    'http://192.168.0.100:5080',
    'http://127.0.0.1:5080',
    'http://10.0.2.2:5080',
  ];

  static String resolvedUrl = preferredUrl;

  static String get preferredUrl => _envUrl.isNotEmpty ? _envUrl : deployedApiUrl;

  static String get apiBaseUrl => resolvedUrl;
}
