const Layout = ({ children, isCollapsed }: { children: React.ReactNode, isCollapsed: boolean }) => {
  return (
    <main className={`${isCollapsed ? 'lg:pl-20' : 'lg:pl-48'} bg-light-primary dark:bg-dark-primary min-h-screen`}>
      <div className="max-w-screen-lg lg:mx-auto mx-4">{children}</div>
    </main>
  );
};

export default Layout;
