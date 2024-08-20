"use client";
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, theme, notification } from 'antd';
import { HomeOutlined, UserOutlined, DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { logout } from '@/helpers/auth_helper';
import { callApi } from '@/helpers/axiosHelper';

const { Header, Sider, Content, Footer } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await callApi('http://localhost:8081/api/menu');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
                setError('Failed to load menu items.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [router]);

    const renderMenuItems = (items: any[]): any[] =>
        items.map((item) => {
            const IconComponent = item.icon === 'HomeOutlined' ? HomeOutlined : item.icon === 'DashboardOutlined' ? DashboardOutlined : UserOutlined;
            if (item.children && item.children.length) {
                return {
                    key: item.key,
                    icon: <IconComponent />,
                    label: item.label,
                    children: renderMenuItems(item.children),
                };
            }
            return {
                key: item.key,
                icon: <IconComponent />,
                label: item.label,
                onClick: () => router.push(item.path),
            };
        });

    const handleLogout = () => {
        logout().then(() => router.push('/login'));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header style={{ padding: 0, background: colorBgContainer, zIndex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#334DA0' }}>
                <a href={'/home'}>
                    <img src={"/exter_name-logo.png"} alt={"logo"} width={150} height={100} />
                </a>
                <Button
                    type="text"
                    icon={collapsed ? <MenuFoldOutlined style={{ color: '#ffff' }} /> : <MenuUnfoldOutlined style={{ color: '#ffff' }} />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ fontSize: '16px', width: 64, height: 64 }}
                />
                <div style={{ flexGrow: 1 }}></div>
                <Button type='primary' onClick={handleLogout} style={{ marginRight: '1rem' }}>Logout</Button>
            </Header>
            <Layout style={{ flex: 2, display: 'flex' }}>
                <Sider collapsible collapsed={collapsed} style={{ overflow: 'auto', background: '#fff' }}>
                    <Menu theme="light" mode="inline" items={renderMenuItems(menuItems)} />
                </Sider>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, flex: 1 }}>
                    {contextHolder}
                    {children}
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: '#334DA0', marginTop: 'auto', height: '50px', padding: '10px', color: "#ffff" }}>
                Exter Battery-Swapping ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default DashboardLayout;
