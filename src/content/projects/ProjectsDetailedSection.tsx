import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import { useState } from 'react';

const projects = [
  {
    num: 1,
    title: 'PCAP Investigation - HTTPS Traffic Analysis',
    goal: 'إثبات فهمك الكامل لطبقات الشبكة من DNS إلى HTTPS.',
    requirements: ['Wireshark', 'Kali أو أي جهاز', 'ملف PCAP من نشاطك'],
    steps: [
      { title: 'التقط PCAP', code: `# على Kali
sudo wireshark
# اختر interface
# ابدأ Capture
# في terminal:
curl -I https://www.github.com
# أوقف Capture
# احفظ كـ https-analysis.pcap` },
      { title: 'التحليل', code: `# استخرج:
# - DNS Query/Response
# - IP المُحلّ
# - TCP Three-way handshake
# - TLS ClientHello (SNI, version, ciphers)
# - TLS ServerHello
# - Certificate info` },
    ],
    reportTemplate: `# HTTPS Traffic Analysis Report

**Investigator**: Your Name
**Date**: 2025-01-15
**PCAP File**: https-analysis.pcap
**Target**: github.com

## Executive Summary
Complete analysis of an HTTPS session to github.com, documenting
DNS resolution, TCP connection establishment, and TLS handshake process.

## Environment
- Source: Kali Linux (192.168.56.30)
- Destination: github.com
- Tool: Wireshark 4.0
- Method: curl HEAD request

## Investigation Timeline
| Time | Phase | Event | Details |
|------|-------|-------|---------|
| 00:00.000 | DNS | Query | A record for github.com |
| 00:00.012 | DNS | Response | 140.82.114.4 |
| 00:00.013 | TCP | SYN | To 140.82.114.4:443 |
| 00:00.025 | TCP | SYN-ACK | Connection accepted |
| 00:00.026 | TCP | ACK | Handshake complete |
| 00:00.027 | TLS | ClientHello | SNI: github.com, TLS 1.3 |
| 00:00.040 | TLS | ServerHello | Selected cipher: AES_256_GCM |
| 00:00.042 | TLS | Certificate | Verified |
| 00:00.044 | TLS | Finished | Encrypted channel established |

## Detailed Analysis

### Phase 1: DNS Resolution
**Filter used**: dns and dns.qry.name contains "github"
Query type: A (IPv4)
Response: 140.82.114.4
Response time: 12ms
TTL: 60 seconds

### Phase 2: TCP Three-Way Handshake
**Filter used**: tcp.flags.syn == 1
- SYN: Seq=0
- SYN-ACK: Seq=0, Ack=1
- ACK: Seq=1, Ack=1
Total handshake time: 13ms

### Phase 3: TLS Handshake
**Filter used**: tls.handshake
**ClientHello Details**:
- TLS Version: 1.3
- SNI Extension: github.com
- Cipher Suites Offered: 17

**ServerHello Details**:
- Selected Cipher: TLS_AES_256_GCM_SHA384
- Certificate Chain: 3 certificates
- Subject: github.com
- Issuer: DigiCert Global Root CA

## Security Observations
✅ TLS 1.3 used (latest version)
✅ Strong cipher selected (AES-256-GCM)
✅ Valid certificate chain

## SOC Relevance
This baseline analysis helps understand normal HTTPS behavior,
essential for detecting anomalies like:
- C2 traffic over HTTPS
- Self-signed certificates
- Unusual SNI patterns
- Weak cipher negotiation

## MITRE ATT&CK Context
Not applicable - benign traffic analysis used as a baseline.

## Tools & Filters Used
| Tool | Purpose | Filter/Command |
|------|---------|----------------|
| Wireshark | Capture & Analysis | dns, tcp.flags.syn==1, tls.handshake |
| curl | Traffic generation | curl -I https://github.com |`,
    deliverables: ['PCAP file', 'Detailed report', '3+ screenshots', 'README in project folder'],
  },
  {
    num: 2,
    title: 'Linux SSH Brute Force - Complete Investigation',
    goal: 'تحقيق كامل في هجوم SSH brute force مع كتابة scripts للأتمتة.',
    requirements: ['Linux target (Ubuntu)', 'Kali (attacker)', 'sshpass'],
    steps: [
      { title: 'محاكاة الهجوم', code: `# من Kali - بدون أدوات هجومية خارجية
for i in {1..30}; do
  sshpass -p "wrongpass$i" ssh -o StrictHostKeyChecking=no admin@192.168.56.40 exit 2>&1
done

# أو يدوياً ادخل كلمات مرور خاطئة 30 مرة` },
      { title: 'جمع الأدلة', code: `# على Ubuntu target:
sudo cp /var/log/auth.log ./investigation/auth-log-evidence.log
last -i > sessions.txt
who > current-users.txt` },
      { title: 'التحليل بـ Bash Script', code: `#!/bin/bash
# SSH Brute Force Investigation Script
# Author: Your Name
# Version: 1.0

LOG_FILE="\${1:-/var/log/auth.log}"
OUTPUT_DIR="./analysis-output"
mkdir -p $OUTPUT_DIR

echo "==================================="
echo "  SSH Brute Force Investigation"
echo "  Log: $LOG_FILE"
echo "  Date: $(date)"
echo "==================================="
echo ""

# 1. Total failed attempts
TOTAL_FAILED=$(grep -c "Failed password" $LOG_FILE)
echo "[+] Total Failed Login Attempts: $TOTAL_FAILED"
echo ""

# 2. Top attacker IPs
echo "[+] Top 10 Attacker IPs:"
grep "Failed password" $LOG_FILE | \\
  awk '{print $11}' | \\
  sort | uniq -c | sort -rn | head -10 | \\
  tee $OUTPUT_DIR/top-attacker-ips.txt
echo ""

# 3. Top targeted users
echo "[+] Top 10 Targeted Users:"
grep "Failed password" $LOG_FILE | \\
  awk '{print $9}' | \\
  sort | uniq -c | sort -rn | head -10 | \\
  tee $OUTPUT_DIR/top-targeted-users.txt
echo ""

# 4. Invalid users
echo "[+] Invalid Users Attempted:"
grep "Invalid user" $LOG_FILE | \\
  awk '{print $8}' | \\
  sort | uniq -c | sort -rn | head -10 | \\
  tee $OUTPUT_DIR/invalid-users.txt
echo ""

# 5. Successful logins
echo "[+] Successful Logins:"
grep "Accepted" $LOG_FILE | \\
  awk '{print $9, "from", $11, "at", $1, $2, $3}' | \\
  tee $OUTPUT_DIR/successful-logins.txt
echo ""

# 6. Attack timeline
echo "[+] Attack Activity by Hour:"
grep "Failed password" $LOG_FILE | \\
  awk '{print $3}' | cut -d: -f1 | \\
  sort | uniq -c | \\
  tee $OUTPUT_DIR/attack-timeline.txt
echo ""

# 7. First and last attack
echo "[+] Attack Window:"
echo "  First: $(grep 'Failed password' $LOG_FILE | head -1 | awk '{print $1, $2, $3}')"
echo "  Last:  $(grep 'Failed password' $LOG_FILE | tail -1 | awk '{print $1, $2, $3}')"
echo ""

# 8. Generate IOC list
echo "[+] Generating IOC list..."
grep "Failed password" $LOG_FILE | \\
  awk '{print $11}' | sort -u > $OUTPUT_DIR/iocs-ips.txt
echo "  IOCs saved to: $OUTPUT_DIR/iocs-ips.txt"

echo ""
echo "==================================="
echo "  Analysis Complete"
echo "  Results in: $OUTPUT_DIR/"
echo "==================================="` },
      { title: 'التحليل بـ Python', code: `#!/usr/bin/env python3
"""
SSH Brute Force IOC Extractor
Author: Your Name | Version: 1.0
"""
import re, sys, json
from collections import Counter
from datetime import datetime

def extract_iocs(log_file):
    ip_pattern = r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'
    iocs = {
        'metadata': {'analyzed_at': datetime.now().isoformat(), 'source': log_file},
        'failed_logins': {'total': 0, 'top_ips': [], 'top_users': []},
        'successful_logins': [], 'invalid_users': [], 'all_attacker_ips': []
    }
    failed_ips, failed_users, invalid_list, success_list = [], [], [], []

    with open(log_file, 'r') as f:
        for line in f:
            ips = re.findall(ip_pattern, line)
            if 'Failed password' in line:
                iocs['failed_logins']['total'] += 1
                if ips: failed_ips.extend(ips)
                m = re.search(r'for (?:invalid user )?(\\S+) from', line)
                if m: failed_users.append(m.group(1))
            elif 'Accepted' in line:
                m = re.search(r'for (\\S+) from', line)
                if m and ips: success_list.append({'user': m.group(1), 'ip': ips[0]})
            elif 'Invalid user' in line:
                m = re.search(r'Invalid user (\\S+)', line)
                if m: invalid_list.append(m.group(1))

    iocs['failed_logins']['top_ips'] = [{'ip':ip,'count':c} for ip,c in Counter(failed_ips).most_common(10)]
    iocs['failed_logins']['top_users'] = [{'user':u,'count':c} for u,c in Counter(failed_users).most_common(10)]
    iocs['successful_logins'] = success_list
    iocs['invalid_users'] = [{'user':u,'count':c} for u,c in Counter(invalid_list).most_common(10)]
    iocs['all_attacker_ips'] = sorted(set(failed_ips))
    return iocs

def print_report(iocs):
    print("=" * 60)
    print("  SSH BRUTE FORCE IOC EXTRACTION REPORT")
    print(f"  Source: {iocs['metadata']['source']}")
    print("=" * 60)
    print(f"\\n[+] Total Failed: {iocs['failed_logins']['total']}")
    print("\\n[+] Top Attacker IPs:")
    for i in iocs['failed_logins']['top_ips']: print(f"    {i['count']:5d} {i['ip']}")
    print("\\n[+] Successful Logins:")
    for i in iocs['successful_logins']: print(f"    {i['user']:20s} from {i['ip']}")
    print(f"\\n[+] Unique Attacker IPs: {len(iocs['all_attacker_ips'])}")

if __name__ == "__main__":
    if len(sys.argv) < 2: print(f"Usage: {sys.argv[0]} <auth.log> [output.json]"); sys.exit(1)
    iocs = extract_iocs(sys.argv[1])
    print_report(iocs)
    out = sys.argv[2] if len(sys.argv) > 2 else 'iocs.json'
    with open(out, 'w') as f: json.dump(iocs, f, indent=2)
    print(f"\\n[+] JSON saved to: {out}")` },
    ],
    reportTemplate: `# SSH Brute Force Investigation

**Case ID**: INC-LIN-001  |  **Severity**: High  |  **Status**: Closed - TP
**Investigator**: Your Name  |  **Date**: 2025-01-15

## Executive Summary
Detected 30 failed SSH authentication attempts from a single source IP
targeting multiple user accounts within a 5-minute window.

## Affected Assets
- Target Host: ubuntu-target (192.168.56.40)
- Service: OpenSSH on port 22
- Targeted Users: admin, root, ubuntu, test, guest

## Attack Timeline
| Time | Event | Details |
|------|-------|---------|
| 14:23:01 | First failed attempt | admin from 192.168.56.30 |
| 14:27:45 | Final attempt | guest from 192.168.56.30 |
| Duration | 4 minutes 49 seconds | 30 attempts, ~6/min |

## MITRE ATT&CK
| Tactic | Technique |
|--------|-----------|
| Credential Access (TA0006) | T1110.001 - Password Guessing |

## Response Actions
1. ✅ Blocked source IP: ufw deny from 192.168.56.30
2. ✅ Verified no successful login occurred
3. ✅ Reviewed all user accounts

## Hardening Recommendations
1. Enable fail2ban
2. Disable password auth, use SSH keys
3. Change SSH port
4. Enable two-factor authentication`,
    deliverables: ['auth.log evidence', 'Bash script', 'Python script', 'Investigation report', 'Screenshots', 'JSON IOCs'],
  },
  {
    num: 3,
    title: 'Windows AD - Lateral Movement Detection Lab',
    goal: 'محاكاة هجوم Lateral Movement بـ PsExec وكشفه باستخدام Windows Events و Sysmon.',
    requirements: ['DC01 (Windows Server)', 'WIN-CLIENT1/2 (Windows 10)', 'Sysmon مثبت', 'Audit Policy مفعل'],
    steps: [
      { title: 'محاكاة الهجوم', code: `# من WIN-CLIENT1 (كـ admin):
PsExec.exe \\\\WIN-CLIENT2 -u DOMAIN\\admin -p Password123 cmd.exe` },
      { title: 'التحليل على الهدف WIN-CLIENT2', code: `# Event 7045 - Service installation (PSEXESVC)
Get-WinEvent -FilterHashtable @{LogName='System';Id=7045} |
  Where-Object {$_.Message -match "PSEXESVC"}

# Event 4624 - Network logon
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624} |
  Where-Object {$_.Properties[8].Value -eq 3}

# Sysmon Event 1 - Process creation
Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational';Id=1
} | Where-Object {$_.Message -match "PSEXESVC"}` },
      { title: 'التحليل على المصدر WIN-CLIENT1', code: `# Sysmon Event 1 - psexec.exe execution
Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational';Id=1
} | Where-Object {$_.Message -match "psexec"}

# Sysmon Event 3 - Network connection to target
Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational';Id=3
} | Where-Object {$_.Message -match "WIN-CLIENT2"}` },
      { title: 'Sigma Detection Rule', code: `title: PsExec Lateral Movement Detection
id: 12345678-1234-1234-1234-123456789012
status: experimental
description: Detects PsExec usage for lateral movement
author: Your Name
date: 2025/01/15
tags:
  - attack.lateral_movement
  - attack.t1021.002
logsource:
  product: windows
  service: system
detection:
  selection:
    EventID: 7045
    ServiceName: PSEXESVC
  condition: selection
level: high` },
    ],
    reportTemplate: `# Lateral Movement Detection - PsExec

**Case ID**: INC-WIN-001  |  **Severity**: Critical
**Status**: Confirmed TP - Lateral Movement Detected

## Attack Path
[Attacker] → WIN-CLIENT1 → [PsExec] → WIN-CLIENT2
                                       ↓ PSEXESVC Service Created
                                       ↓ cmd.exe Execution

## Timeline
| Time | Source | Event | Target | Details |
|------|--------|-------|--------|---------|
| 10:00:00 | WIN-CLIENT1 | Sysmon 1 | - | psexec.exe launched |
| 10:00:01 | WIN-CLIENT1 | Sysmon 3 | WIN-CLIENT2 | SMB (port 445) |
| 10:00:02 | WIN-CLIENT2 | Sec 4624 | - | Network logon Type 3 |
| 10:00:02 | WIN-CLIENT2 | Sys 7045 | - | PSEXESVC installed |
| 10:00:03 | WIN-CLIENT2 | Sysmon 1 | - | PSEXESVC → cmd.exe |

## Detection Evidence
- Event 7045: PSEXESVC service installation 🚨
- Event 4624: Network Logon Type 3, NTLM auth ⚠️
- Process Tree: services.exe → PSEXESVC.exe → cmd.exe 🚨
- Sysmon 3: SMB connection to port 445

## MITRE ATT&CK
| Tactic | Technique |
|--------|-----------|
| Lateral Movement | T1021.002 - SMB Admin Shares |
| Execution | T1569.002 - Service Execution |

## Response Actions
1. ✅ Both endpoints isolated
2. ✅ Admin account password reset
3. ✅ Memory dumps collected
4. ✅ Full AV scan initiated

## Recommendations
- Disable Admin Shares if not needed
- Enforce SMB signing
- Restrict PsExec via AppLocker
- Implement LAPS`,
    deliverables: ['EVTX files من الجهازين', 'PowerShell scripts للاستعلام', 'Sysmon config المستخدم', 'Sigma rule', 'Process tree screenshot', 'Full investigation report'],
  },
  {
    num: 4,
    title: 'Wazuh SIEM - Complete Deployment',
    goal: 'نشر Wazuh كاملاً مع agents وقواعد مخصصة.',
    requirements: ['Ubuntu 22.04 Server (8GB RAM)', 'Windows Client', 'Linux Client'],
    steps: [
      { title: 'تثبيت Wazuh Server', code: `# على Ubuntu 22.04
curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh
sudo bash ./wazuh-install.sh -a
# احفظ الـ admin password` },
      { title: 'تثبيت Agent على Windows', code: `msiexec /i wazuh-agent-4.7.0-1.msi /q ^
  WAZUH_MANAGER="WAZUH-SERVER-IP" ^
  WAZUH_AGENT_NAME="WIN-CLIENT1"
NET START WazuhSvc` },
      { title: 'تثبيت Agent على Linux', code: `curl -so wazuh-agent.deb https://packages.wazuh.com/4.x/apt/...
sudo WAZUH_MANAGER="WAZUH-SERVER-IP" dpkg -i ./wazuh-agent.deb
sudo systemctl enable wazuh-agent
sudo systemctl start wazuh-agent` },
      { title: 'إنشاء Custom Rules', code: `<!-- ملف /var/ossec/etc/rules/local_rules.xml -->

<group name="windows,powershell,">
  <!-- PowerShell Encoded Command -->
  <rule id="100001" level="12">
    <if_sid>91802</if_sid>
    <field name="win.eventdata.scriptBlockText">EncodedCommand</field>
    <description>Suspicious PowerShell: EncodedCommand detected</description>
    <mitre><id>T1059.001</id></mitre>
  </rule>

  <!-- PowerShell Download Cradle -->
  <rule id="100002" level="13">
    <if_sid>91802</if_sid>
    <field name="win.eventdata.scriptBlockText" type="pcre2">
      (DownloadString|DownloadFile|IEX|Invoke-Expression)
    </field>
    <description>PowerShell Download Cradle detected</description>
    <mitre><id>T1059.001</id><id>T1105</id></mitre>
  </rule>
</group>

<group name="windows,lateral_movement,">
  <!-- PsExec Service Installation -->
  <rule id="100010" level="13">
    <if_sid>61151</if_sid>
    <field name="win.eventdata.serviceName">PSEXESVC</field>
    <description>PsExec lateral movement detected</description>
    <mitre><id>T1021.002</id><id>T1569.002</id></mitre>
  </rule>
</group>

<group name="windows,credential_access,">
  <!-- LSASS Access (potential Mimikatz) -->
  <rule id="100020" level="14">
    <if_sid>61648</if_sid>
    <field name="win.eventdata.targetImage" type="pcre2">lsass\\.exe</field>
    <field name="win.eventdata.grantedAccess">0x1010|0x1410|0x1438</field>
    <description>Suspicious LSASS Access - Possible Credential Dumping</description>
    <mitre><id>T1003.001</id></mitre>
  </rule>
</group>

<group name="linux,bruteforce,">
  <!-- High volume SSH failures -->
  <rule id="100030" level="10" frequency="10" timeframe="60">
    <if_matched_sid>5716</if_matched_sid>
    <description>SSH Brute Force: Multiple failures in 1 minute</description>
    <mitre><id>T1110.001</id></mitre>
  </rule>
</group>` },
      { title: 'إعادة تشغيل والتحقق', code: `sudo systemctl restart wazuh-manager
# ولّد أحداث للاختبار:
# - على Windows: شغّل powershell encoded
# - على Linux: 10+ failed SSH
# افحص في Dashboard` },
    ],
    reportTemplate: `# Wazuh SIEM Deployment Project

## Architecture
┌─────────────────┐
│  Wazuh Server   │
│ 192.168.56.50   │
└────────┬────────┘
         │
┌────────┼────────────┐
│        │            │
DC01   WIN-CLIENT   UBUNTU01
Agent    Agent       Agent

## Custom Detection Rules
| Rule ID | Severity | Description | MITRE |
|---------|----------|-------------|-------|
| 100001 | 12 | PowerShell EncodedCommand | T1059.001 |
| 100002 | 13 | PowerShell Download Cradle | T1059.001, T1105 |
| 100010 | 13 | PsExec Lateral Movement | T1021.002 |
| 100020 | 14 | LSASS Credential Dumping | T1003.001 |
| 100030 | 10 | SSH Brute Force | T1110.001 |

## Test Results
- PowerShell Encoded: ✅ Alert within 5 seconds
- SSH Brute Force: ✅ Alert at 10 attempts
- LSASS Access: ✅ Critical alert, severity 14`,
    deliverables: ['Deployment guide', 'Custom rules XML', 'Dashboard screenshots', 'Test results', 'Architecture diagram'],
  },
  {
    num: 5,
    title: 'Phishing Email Analysis',
    goal: 'تحليل phishing email احترافي.',
    requirements: ['Email sample (PhishTank/PhishStats)', 'VirusTotal', 'URLscan.io', 'any.run'],
    steps: [
      { title: 'لا تفتح المرفقات على جهازك!', code: `# استخدم:
# - Sandbox (any.run, hybrid-analysis)
# - VM معزولة
# - جهاز LAB` },
      { title: 'تحقق من Headers', code: `# ابحث عن:
# - Return-Path
# - From vs Reply-To (مختلفين = مشبوه)
# - Received headers (تتبع المسار)
# - SPF: fail = مشبوه
# - DKIM: fail = مشبوه
# - DMARC: fail = مشبوه` },
    ],
    reportTemplate: `# Phishing Email Analysis Report

**Case ID**: PHISH-001  |  **Classification**: Confirmed Phishing

## Email Metadata
| Field | Value |
|-------|-------|
| From (Display) | "Microsoft Office 365" |
| From (Actual) | support@office365-verify[.]com |
| Reply-To | recover@office365-verify[.]com |
| Subject | "Action Required: Your Mailbox Storage Full" |

## Header Analysis
- SPF: ❌ FAIL
- DKIM: ❌ FAIL
- DMARC: ❌ FAIL

## Red Flags
| Indicator | Risk Level |
|-----------|------------|
| Generic greeting "Dear User" | Medium |
| Urgency tactics (24 hours) | High |
| Threat of consequences | High |
| Mismatched sender domain | Critical |

## URL Analysis
- Displayed: https://office365.microsoft.com/verify
- Actual: https://office365-verify[.]com/login.php
- WHOIS: Registered 5 days ago! 🚨
- VirusTotal: 18/85 flagged as phishing

## IOCs
| Type | Value | Confidence |
|------|-------|------------|
| Domain | office365-verify.com | High |
| IP | 45.142.213.X | High |
| Email | support@office365-verify.com | High |

## MITRE: T1566.002 - Spearphishing Link

## Response Actions
1. ✅ Removed from all 45 inboxes
2. ✅ Blocked sender domain
3. ✅ Blocked URL at proxy
4. ✅ Reset password for user2 (compromised)`,
    deliverables: ['Email headers (sanitized)', 'Screenshots', 'IOC list', 'Full report'],
  },
  {
    num: 6,
    title: 'Threat Hunting - Beaconing Detection',
    goal: 'البحث الاستباقي عن beaconing patterns (C2 communication).',
    requirements: ['SIEM', 'Python', 'KQL/SPL'],
    steps: [
      { title: 'Hunt Hypothesis', code: `# "Malware C2 beacons can be identified by their regular,
# periodic network connections to external destinations,
# often with consistent packet sizes."` },
      { title: 'KQL Query - Periodic Connections', code: `DeviceNetworkEvents
| where Timestamp > ago(24h)
| where RemoteIPType == "Public"
| where ActionType == "ConnectionSuccess"
| summarize ConnCount = count(),
    TimeStamps = make_list(Timestamp),
    UniqueIPs = dcount(RemoteIP)
  by DeviceName, RemoteIP, RemotePort, InitiatingProcessFileName
| where ConnCount > 20
| order by ConnCount desc` },
      { title: 'Python - Beaconing Analysis', code: `import numpy as np
from datetime import datetime

def analyze_beaconing(timestamps):
    """Calculate intervals and check for beaconing"""
    intervals = []
    for i in range(1, len(timestamps)):
        delta = (timestamps[i] - timestamps[i-1]).total_seconds()
        intervals.append(delta)

    if len(intervals) < 5:
        return None

    mean = np.mean(intervals)
    std = np.std(intervals)
    cv = std / mean if mean > 0 else 0

    # CV < 0.1 strongly suggests beaconing
    return {
        'mean_interval': mean,
        'std_dev': std,
        'cv': cv,
        'is_beacon': cv < 0.1,
        'connection_count': len(timestamps)
    }` },
    ],
    reportTemplate: `# Threat Hunt Report: Beaconing Detection

**Hunt ID**: HUNT-002  |  **Duration**: 4 hours

## Hunt Hypothesis
"Malware C2 beacons can be identified by their regular, periodic
network connections to external destinations."

## Suspicious Activity Found
**Host**: FIN-WS-04
**Process**: chrome.exe
**Destination**: 185.220.101.X:443
**Pattern**:
- 96 connections in 24h
- Mean interval: 900 seconds (15 min)
- Std deviation: 12 seconds
- CV: 0.013 (highly regular) 🚨

## Verdict
🚨 TRUE POSITIVE: Confirmed malicious browser extension
performing C2 beaconing every 15 minutes.

## Response
1. ✅ Isolated FIN-WS-04
2. ✅ Removed malicious extension
3. ✅ Found on 3 more workstations - all remediated

## MITRE ATT&CK
- T1071.001 - Web Protocols
- T1176 - Browser Extensions`,
    deliverables: ['Hunt hypothesis', 'KQL queries', 'Python analysis script', 'Hunt report'],
  },
  {
    num: 7,
    title: 'Detection Engineering - Sigma Rules Pack',
    goal: 'كتابة مجموعة من 10+ Sigma detection rules.',
    requirements: ['Sigma format knowledge', 'YAML'],
    steps: [
      { title: 'نموذج Sigma Rule', code: `title: PowerShell Encoded Command Execution
id: a1b2c3d4-e5f6-7890-abcd-ef1234567890
status: stable
description: |
  Detects PowerShell execution with -EncodedCommand parameter
  commonly used by attackers to obfuscate malicious code.
references:
  - https://attack.mitre.org/techniques/T1059/001/
author: Your Name
date: 2025/01/15
tags:
  - attack.execution
  - attack.t1059.001
  - attack.defense_evasion
  - attack.t1027
logsource:
  product: windows
  category: process_creation
detection:
  selection_img:
    Image|endswith:
      - '\\\\powershell.exe'
      - '\\\\pwsh.exe'
  selection_cmd:
    CommandLine|contains:
      - '-EncodedCommand'
      - '-enc '
      - '-ec '
  condition: selection_img and selection_cmd
falsepositives:
  - Legitimate administrative scripts (rare)
level: high` },
    ],
    reportTemplate: `اكتب 10+ rules مختلفة تغطي:
- PowerShell encoded
- Lateral movement (PsExec, WMI, WinRM)
- Persistence (Scheduled tasks, Services, Registry)
- Credential access (LSASS, SAM)
- Defense evasion (Log clearing, LOLBins)
- Discovery (net commands, whoami)`,
    deliverables: ['10+ Sigma YAML files', 'Testing documentation', 'MITRE mapping'],
  },
  {
    num: 8,
    title: 'Incident Response Tabletop Exercise',
    goal: 'محاكاة حادثة Ransomware كاملة وتوثيق الاستجابة.',
    requirements: ['Documentation', 'NIST framework'],
    steps: [
      { title: 'السيناريو', code: `# "تنبيه: Ransomware detected on FIN-SRV-01.
# الإدارة تطلب تحديث كل 30 دقيقة."
#
# اكتب:
# - الـ timeline الكامل للاستجابة
# - القرارات المتخذة في كل مرحلة
# - التواصل مع stakeholders
# - التحديثات للإدارة كل 30 دقيقة
# - التقرير النهائي` },
    ],
    reportTemplate: `Timeline + Decisions + Communication + Final Report`,
    deliverables: ['Timeline', 'Decisions log', 'Stakeholder updates', 'Final report'],
  },
  {
    num: 9,
    title: 'MITRE ATT&CK Coverage Assessment',
    goal: 'تقييم تغطية الكشف لشركة افتراضية.',
    requirements: ['MITRE Navigator', 'Excel/Sheets'],
    steps: [
      { title: 'الخطوات', code: `# 1. اختر 30 technique من MITRE
# 2. لكل technique:
#    - هل نستطيع كشفها؟
#    - ما المصدر المطلوب؟
#    - مستوى الثقة
# 3. اعمل heatmap بالألوان
# 4. اكتب توصيات لسد الثغرات` },
    ],
    reportTemplate: `Coverage heatmap + Gap analysis + Recommendations`,
    deliverables: ['Coverage heatmap', 'Gap analysis', 'Recommendations'],
  },
  {
    num: 10,
    title: 'Lab Setup Documentation',
    goal: 'توثيق كامل للـ Home Lab.',
    requirements: ['VirtualBox/VMware', 'Visio/draw.io'],
    steps: [
      { title: 'المحتوى المطلوب', code: `# - Network diagram (draw.io)
# - VM specifications لكل جهاز
# - Network configuration
# - Snapshots strategy
# - Tools installed على كل جهاز
# - Use cases لكل VM` },
    ],
    reportTemplate: `Network diagram + VM specs + Config guide + Snapshots policy`,
    deliverables: ['Network diagram', 'VM specifications', 'Configuration guide', 'Snapshots policy'],
  },
];

const ProjectsDetailedSection = () => {
  const [openProject, setOpenProject] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🏗️</span>
        المشاريع الـ 10 - التفاصيل الكاملة
      </h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="golden">
        كل مشروع يحتوي على: الهدف + الخطوات + الأكواد + قالب التقرير + المخرجات المطلوبة. <strong>انسخ وطبّق!</strong>
      </Alert>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.num} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            {/* Header - Always visible */}
            <button
              onClick={() => setOpenProject(openProject === project.num ? null : project.num)}
              className="w-full p-6 flex items-center gap-4 hover:bg-gray-700/30 transition-colors text-right"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {project.num}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.goal}</p>
              </div>
              <span className="text-cyan-400 text-2xl">{openProject === project.num ? '−' : '+'}</span>
            </button>

            {/* Expanded content */}
            {openProject === project.num && (
              <div className="p-6 pt-0 space-y-6 border-t border-gray-700">
                {/* المتطلبات */}
                <div>
                  <h4 className="text-cyan-400 font-bold mb-3">🛠️ المتطلبات:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.requirements.map((req, i) => (
                      <span key={i} className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">{req}</span>
                    ))}
                  </div>
                </div>

                {/* الخطوات */}
                <div className="space-y-4">
                  <h4 className="text-green-400 font-bold">📋 الخطوات:</h4>
                  {project.steps.map((step, i) => (
                    <div key={i}>
                      <h5 className="text-white font-bold mb-2">الخطوة {i + 1}: {step.title}</h5>
                      <CodeBlock code={step.code} />
                    </div>
                  ))}
                </div>

                {/* قالب التقرير */}
                <div>
                  <h4 className="text-purple-400 font-bold mb-3">📝 قالب التقرير:</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                    <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono" dir="ltr">
                      {project.reportTemplate}
                    </pre>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(project.reportTemplate)}
                    className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors"
                  >
                    📋 نسخ القالب
                  </button>
                </div>

                {/* المخرجات */}
                <div>
                  <h4 className="text-yellow-400 font-bold mb-3">📦 المخرجات المطلوبة:</h4>
                  <ul className="space-y-1">
                    {project.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-gray-500">☐</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsDetailedSection;
