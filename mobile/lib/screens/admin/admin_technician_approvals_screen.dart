import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fixflow_mobile/core/app_theme.dart';
import 'package:fixflow_mobile/models/models.dart';
import 'package:fixflow_mobile/providers/app_providers.dart';
import 'package:fixflow_mobile/utils/formatters.dart';
import 'package:fixflow_mobile/widgets/async_body.dart';
import 'package:fixflow_mobile/widgets/fixflow_ui.dart';
import 'package:fixflow_mobile/widgets/status_chip.dart';

class AdminTechnicianApprovalsScreen extends ConsumerStatefulWidget {
  const AdminTechnicianApprovalsScreen({super.key});

  @override
  ConsumerState<AdminTechnicianApprovalsScreen> createState() => _AdminTechnicianApprovalsScreenState();
}

class _AdminTechnicianApprovalsScreenState extends ConsumerState<AdminTechnicianApprovalsScreen> {
  List<AdminTechnicianAccount> _accounts = [];
  String? _error;
  String? _approvingId;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final result = await ref.read(apiProvider).adminTechnicianAccounts();
      if (!mounted) return;
      setState(() => _accounts = result.items);
    } catch (error) {
      if (!mounted) return;
      setState(() => _error = error.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _approve(AdminTechnicianAccount account) async {
    setState(() {
      _approvingId = account.id;
      _error = null;
    });
    try {
      await ref.read(apiProvider).setTechnicianAccountActive(account.id, true);
      if (!mounted) return;
      setState(() => _accounts.removeWhere((item) => item.id == account.id));
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('${account.displayName} can now sign in as a technician.')),
      );
    } catch (error) {
      if (!mounted) return;
      setState(() => _error = error.toString());
    } finally {
      if (mounted) setState(() => _approvingId = null);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FixFlowScaffold(
      title: 'Technician login approvals',
      description: 'Approve account access here. Trade document verification remains under Verifications.',
      actions: [
        IconButton(
          tooltip: 'Refresh pending approvals',
          onPressed: _loading ? null : _load,
          icon: const Icon(Icons.refresh),
        ),
      ],
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null && _accounts.isEmpty
              ? ErrorView(message: _error!, onRetry: _load)
              : RefreshIndicator(
                  onRefresh: _load,
                  child: ListView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    children: [
                      if (_error != null) ErrorView(message: _error!, onRetry: _load),
                      if (_accounts.isEmpty)
                        const Padding(
                          padding: EdgeInsets.only(top: 32),
                          child: Center(
                            child: Text('No pending technician logins.', style: TextStyle(color: AppColors.muted)),
                          ),
                        ),
                      ..._accounts.map(
                        (account) => Card(
                          margin: const EdgeInsets.only(bottom: 10),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(account.displayName, style: Theme.of(context).textTheme.titleMedium),
                                    ),
                                    const StatusChip(label: 'PENDING'),
                                  ],
                                ),
                                const SizedBox(height: 6),
                                Text(account.email),
                                if (account.phone?.isNotEmpty == true) Text('Phone: ${account.phone}'),
                                if (account.requestedCategory?.isNotEmpty == true)
                                  Text('Trade: ${account.requestedCategory}'),
                                if (account.serviceArea?.isNotEmpty == true) Text('Area: ${account.serviceArea}'),
                                Text('Registered ${formatDate(account.createdAt)}'),
                                const SizedBox(height: 12),
                                SizedBox(
                                  width: double.infinity,
                                  child: FilledButton.icon(
                                    onPressed: _approvingId == null ? () => _approve(account) : null,
                                    icon: _approvingId == account.id
                                        ? const SizedBox.square(
                                            dimension: 18,
                                            child: CircularProgressIndicator(strokeWidth: 2),
                                          )
                                        : const Icon(Icons.check),
                                    label: const Text('Approve login'),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }
}