"use client"

import React, { useState } from 'react';
import Image from "next/image";
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, MenuProps } from 'antd';
import Link from 'next/link';
import { Footer } from 'antd/es/layout/layout';
import router from 'next/dist/client/router';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    function handleAboutClick() {
        router.push('/dashboard/form'); // Use the router object from the prop
    }
    const { Header, Sider, Content } = Layout;
    const items: MenuItem[] = [
        getItem(<nav>
          <Link onClick={handleAboutClick} href={'/dashboard/form'}>Generate Serial Code</Link>
        </nav>, '1', <AppstoreOutlined />),
        
        getItem(
            <nav>
                <Link href={'/dashboard/Orders'}>Orders</Link>
            </nav>,'2',<ShoppingCartOutlined />
        )
    ];

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header style={{ padding: 0, background: colorBgContainer, width: '100%', zIndex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#13322B ' }}>
                <a href={'/dashboard'}>
                    <Image src={"/vivitron_logo.png"} alt={"logo"} width={150}
                        height={100}
                        priority
                    />
                </a>
                <Button
                    type="text"
                    icon={collapsed ? <MenuFoldOutlined style={{ color: '#ffff' }} /> : <MenuUnfoldOutlined style={{ color: '#ffff' }} />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
            </Header>
            <Layout style={{ flex: 2, display: 'flex', height: '0px' }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    style={{
                        overflow: 'auto',
                        borderRight: `1px solid ${colorBgContainer}`,
                        transition: 'all 0.3s ease',
                        background: '#fff'
                    }}
                    width={250} // Set a default width for the Sider
                    collapsedWidth={80} // Set the width when Sider is collapsed
                >
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        items={items}
                    />
                    {/* Add additional dynamic content here */}
                </Sider>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        flex: 1, // Fill remaining vertical space
                    }}
                >
                    {children}
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: '#13322B', marginTop: 'auto', height: '50px', padding: '10px', color:"#ffff"}}>
                vivitron Energy Pvt Ltd ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default DashboardLayout;
