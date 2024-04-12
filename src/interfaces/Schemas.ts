export interface Account {
    user: string;
    plan: string;
    outgoing_mail_suspended: number;
    backup: number;
    maxftp: string;
    max_emailacct_quota: string;
    maxsql: string;
    uid: string;
    theme: string;
    legacy_backup: number;
    maxpop: string;
    ipv6: any[]; // Se for uma matriz de valores, você pode deixar como any[] ou especificar o tipo correto
    max_defer_fail_percentage: string;
    domain: string;
    ip: string;
    suspendreason: string;
    diskused: string;
    min_defer_fail_to_trigger_protection: string;
    temporary: number;
    is_locked: number;
    maxaddons: string;
    maxparked: string;
    startdate: string;
    child_nodes: any[]; // Se for uma matriz de valores, você pode deixar como any[] ou especificar o tipo correto
    unix_startdate: number;
    maxsub: string;
    suspended: number;
    inodeslimit: string;
    maxlst: string;
    partition: string;
    email: string;
    outgoing_mail_hold: number;
    has_backup: number;
    disklimit: string;
    inodesused: number;
    max_email_per_hour: string;
    shell: string;
    mailbox_format: string;
    suspendtime: number;
    owner: string;
}

export interface AccountCreated {
    domain: string;
    ip: string;
    package: string;
    username: string;
    password: string;
    nameservers: {
        nameserver: string;
        entry: null | string;
        a: null | string;
    }[];
}