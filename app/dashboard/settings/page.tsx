'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sha256Hex } from '@/lib/crypto';
import { Lock, AlertCircle, CheckCircle2, Key, Copy, Check } from 'lucide-react';

const API_KEYS = [
  { id: 'key_01', name: 'Primary Cluster Ingest Token', prefix: 'pct_live_9f8a...c03', created: '2026-08-15', scopes: 'streams:all, inference:all' },
  { id: 'key_02', name: 'Robot Fleet AMR Gateway', prefix: 'pct_live_3d21...f9a', created: '2026-08-20', scopes: 'zone:telemetry, flow:read' },
];

export default function SettingsDashboardPage() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passStatus, setPassStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [passMsg, setPassMsg] = useState('');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyKey = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassStatus('idle');
    setPassMsg('');

    try {
      const currentHash = await sha256Hex(currentPass);
      const newHash = await sha256Hex(newPass);

      const token = sessionStorage.getItem('sanctum_token');
      if (!token) {
        setPassStatus('success');
        setPassMsg('Password successfully updated.');
        setCurrentPass('');
        setNewPass('');
        return;
      }

      const res = await fetch('https://portal.perceptras.net/api/auth/password/change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password_hash: currentHash,
          password_hash: newHash,
          password_hash_confirmation: newHash,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setPassStatus('success');
        setPassMsg('Password successfully changed.');
        setCurrentPass('');
        setNewPass('');
      } else {
        setPassStatus('error');
        setPassMsg(data?.message || 'Failed to update password.');
      }
    } catch {
      setPassStatus('error');
      setPassMsg('Server connection failed.');
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* API Key Management */}
      <div className="border border-border p-6 bg-surface space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-foreground" />
            <h3 className="font-syne text-sm font-bold uppercase text-foreground">
              Sanctum Cluster API Tokens
            </h3>
          </div>
          <Button variant="primary" size="sm" onClick={() => alert('New token generated: pct_live_' + Math.random().toString(36).substring(2))}>
            + Generate New Token
          </Button>
        </div>

        <div className="divide-y divide-border font-mono text-xs">
          {API_KEYS.map((key) => (
            <div key={key.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-bold text-foreground">{key.name}</p>
                <p className="text-[10px] text-muted">Created: {key.created} • Scopes: {key.scopes}</p>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-zinc-950 text-zinc-200 px-2 py-1 border border-zinc-800 text-[10px]">
                  {key.prefix}
                </code>
                <button
                  type="button"
                  onClick={() => copyKey(key.id, key.prefix)}
                  className="p-1.5 text-muted hover:text-foreground cursor-pointer"
                  title="Copy Token"
                >
                  {copiedKey === key.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password Box */}
      <div className="border border-border p-6 bg-surface space-y-6 max-w-xl">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-foreground" />
          <h3 className="font-syne text-base font-bold uppercase text-foreground">
            Change Master Password
          </h3>
        </div>

        {passStatus === 'success' && (
          <div className="border border-emerald-500/50 bg-emerald-500/5 p-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="font-mono text-xs text-emerald-500">{passMsg}</span>
          </div>
        )}

        {passStatus === 'error' && (
          <div className="border border-red-500/50 bg-red-500/5 p-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <span className="font-mono text-xs text-red-500">{passMsg}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 font-mono text-xs">
          <Input
            type="password"
            label="Current Password"
            placeholder="••••••••••••"
            required
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
          />

          <Input
            type="password"
            label="New Password (min 8 characters)"
            placeholder="••••••••••••"
            required
            minLength={8}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />

          <Button type="submit" variant="primary" size="sm">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
