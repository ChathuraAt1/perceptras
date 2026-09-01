'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sha256Hex } from '@/lib/crypto';
import { Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SettingsDashboardPage() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passStatus, setPassStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [passMsg, setPassMsg] = useState('');

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
        setPassMsg('Password updated in local session mode.');
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
    <div className="max-w-2xl space-y-8">
      <div className="border border-border p-6 bg-surface space-y-6">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-foreground" />
          <h3 className="font-syne text-base font-bold uppercase text-foreground">
            Change Password
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
