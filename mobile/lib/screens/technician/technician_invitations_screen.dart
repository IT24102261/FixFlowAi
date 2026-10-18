import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fixflow_mobile/models/models.dart';
import 'package:fixflow_mobile/providers/app_providers.dart';
import 'package:fixflow_mobile/routes/app_router.dart';
import 'package:fixflow_mobile/utils/formatters.dart';
import 'package:fixflow_mobile/widgets/fixflow_ui.dart';
import 'package:fixflow_mobile/widgets/status_chip.dart';

class TechnicianInvitationsScreen extends ConsumerStatefulWidget {
  const TechnicianInvitationsScreen({super.key});

  @override
  ConsumerState<TechnicianInvitationsScreen> createState() => _TechnicianInvitationsScreenState();
}

class _TechnicianInvitationsScreenState extends ConsumerState<TechnicianInvitationsScreen>
    with WidgetsBindingObserver {
  List<Invitation> _items = [];
  String? _error;
  bool _loading = true;
  bool _requestInProgress = false;
  Timer? _refreshTimer;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _load();
    _refreshTimer = Timer.periodic(const Duration(seconds: 20), (_) {
      if (WidgetsBinding.instance.lifecycleState == AppLifecycleState.resumed) {
        _load();
      }
    });
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) _load();
  }

  @override
  void dispose() {
    _refreshTimer?.cancel();
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  Future<void> _load() async {
    if (_requestInProgress) return;
    _requestInProgress = true;
    try {
      final items = await ref.read(apiProvider).invitations();
      if (!mounted) return;
      setState(() {
        _items = items;
        _error = null;
      });
    } catch (error) {
      if (!mounted) return;
      setState(() => _error = error.toString());
    } finally {
      _requestInProgress = false;
      if (mounted && _loading) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FixFlowScaffold(
      kind: WorkspaceKind.technician,
      tabIndex: 1,
      title: 'Invitations',
      description: 'New invitations refresh automatically while this screen is open. Pull down to check now.',
      actions: [
        IconButton(
          tooltip: 'Refresh invitations',
          onPressed: _requestInProgress ? null : _load,
          icon: const Icon(Icons.refresh),
        ),
      ],
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _load,
              child: ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                      padding: const EdgeInsets.all(16),
                      children: [
                        if (_error != null)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
                          ),
                        if (_items.isEmpty)
                          const Padding(
                            padding: EdgeInsets.only(top: 24),
                            child: Center(
                              child: Text('No invitations yet. Pull down to check again.'),
                            ),
                          ),
                        ..._items
                          .map(
                            (item) => Card(
                              child: Padding(
                                padding: const EdgeInsets.all(16),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Expanded(child: Text(item.categoryName ?? 'Invitation')),
                                        StatusChip(label: item.status),
                                      ],
                                    ),
                                    Text(item.description),
                                    Text(
                                      item.preferredStart == null
                                          ? 'Preferred appointment: not set'
                                          : 'Preferred appointment: ${formatDate(item.preferredStart)}',
                                    ),
                                    Text('Area: ${item.serviceArea ?? 'approximate only'}'),
                                    Text(formatDate(item.sentAt)),
                                    if (!item.canQuote)
                                      Padding(
                                        padding: const EdgeInsets.only(top: 8),
                                        child: Text(
                                          'This job has already been accepted by another technician.',
                                          style: Theme.of(context).textTheme.bodySmall?.copyWith(color: const Color(0xFF9A968E)),
                                        ),
                                      )
                                    else if (item.status == 'SENT')
                                      Row(
                                        children: [
                                          TextButton(
                                            onPressed: () async {
                                              await ref.read(apiProvider).acceptInvitation(item.id);
                                              await _load();
                                            },
                                            child: const Text('Accept'),
                                          ),
                                          TextButton(
                                            onPressed: () async {
                                              await ref.read(apiProvider).declineInvitation(item.id);
                                              await _load();
                                            },
                                            child: const Text('Decline'),
                                          ),
                                        ],
                                      )
                                    else if (item.status == 'ACCEPTED')
                                      FilledButton(
                                        onPressed: () => Navigator.pushNamed(context, AppRoutes.technicianQuote, arguments: item),
                                        child: const Text('Create quotation'),
                                      ),
                                  ],
                                ),
                              ),
                            ),
                          )
                      ],
                    ),
            ),
    );
  }
}
