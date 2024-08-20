// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { callApi } from '../../helpers/axiosHelper';
// import { Layout, Menu } from 'antd';
// import { UserOutlined, DashboardOutlined, SettingOutlined, ProfileOutlined, TagsOutlined } from '@ant-design/icons';

// const { Sider, Content } = Layout;

// type UserInfo = {
//   name: string;
//   preferred_username: string;
//   given_name: string;
//   family_name: string;
//   exterClientID: string;
//   email: string;
//   isTokenValid: boolean;
//   role: string;
// };

// type MenuItem = {
//   icon: "UserOutlined" | "DashboardOutlined" | "SettingOutlined" | "ProfileOutlined" | "TasksOutlined";
//   id: string;
//   label: string;
//   path: string;
//   children?: MenuItem[];
// };

// const iconMap = {
//   'UserOutlined': UserOutlined,
//   'DashboardOutlined': DashboardOutlined,
//   'SettingOutlined': SettingOutlined,
//   'ProfileOutlined': ProfileOutlined,
//   'TasksOutlined': TagsOutlined,
// };

// const DashboardPage = ({ endpoint }: { endpoint: string }) => {
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await callApi(endpoint);
//         setUserInfo(response.data);

//         // Fetch menu items
//         const menuResponse = await callApi('http://localhost:8081/api/menu');
//         setMenuItems(menuResponse.data);

//         // Route based on exterClientID
//         if (response.data.exterClientID) {
//           router.push(`/u${response.data.exterClientID}`);
//         } else {
//           setError('Exter Client ID not found.');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('An error occurred while fetching data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [endpoint, router]);

//   const renderMenuItems = (items: MenuItem[]): any[] => {
//     return items.map(item => {
//       const IconComponent = iconMap[item.icon as keyof typeof iconMap] || UserOutlined;

//       if (item.children && item.children.length > 0) {
//         return {
//           key: item.id,
//           icon: <IconComponent />,
//           label: item.label,
//           children: renderMenuItems(item.children),
//         };
//       } else {
//         return {
//           key: item.id,
//           icon: <IconComponent />,
//           label: item.label,
//           onClick: () => router.push(item.path),
//         };
//       }
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider>
//         <div className="logo" />
//         <Menu theme="dark" mode="inline" items={renderMenuItems(menuItems)} />
//       </Sider>
//       <Layout>
//         <Content style={{ margin: '16px' }}>
//           <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
//             <h1>Welcome, {userInfo?.name}</h1>
//             <p><strong>Username:</strong> {userInfo?.preferred_username}</p>
//             <p><strong>Email:</strong> {userInfo?.email}</p>
//             <p><strong>Role:</strong> {userInfo?.role}</p>
//             {/* Add more user info as needed */}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default DashboardPage;
