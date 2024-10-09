import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { TodosCreate, TodosEdit, TodosList, TodosShow } from "./pages/todos";
import { UsersCreate, UsersEdit, UsersList, UsersShow } from "./pages/users";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/categories";
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "./pages/blog-posts";
import { CustomLogin } from "./pages/customLogin";
import { GroupCreate, GroupEdit, GroupList, GroupShow } from "./pages/awt/group";
import { dataListProvider } from "./dataProvider";

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com";
  const CATEGORIES_BLOGS = "https://api.fake-rest.refine.dev";
  const DJANGO_BACKEND = "https://amitawt.pythonanywhere.com/awt";
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            {/* <DevtoolsProvider> */}
            <Refine
              dataProvider={{
                default: dataProvider(API_URL),
                categories_blog: dataProvider(CATEGORIES_BLOGS),
                // django_backend: dataProvider(DJANGO_BACKEND),
                django_backend: dataListProvider(DJANGO_BACKEND)
              }}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "todos",
                  list: "/todos",
                  create: "/todos/create",
                  edit: "/todos/edit/:id",
                  show: "/todos/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "group",
                  list: "/group",
                  create: "/group/create",
                  edit: "/group/edit/:id",
                  show: "/group/show/:id",
                  meta: {
                    canDelete: true,
                    dataProviderName: "django_backend",
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                    dataProviderName: "categories_blog",
                  },
                },
                {
                  name: "blog_posts",
                  list: "/blog_posts",
                  create: "/blog_posts/create",
                  edit: "/blog_posts/edit/:id",
                  show: "/blog_posts/show/:id",
                  meta: {
                    canDelete: true,
                    dataProviderName: "categories_blog",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "9cVqMK-6Xe0tb-cPB593",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={Header}
                        Sider={() => (
                          <ThemedSiderV2
                            // Title={({ collapsed }) => <CustomTitle collapsed={collapsed} />}
                            Title={({ collapsed }) => (
                              <ThemedTitleV2
                                // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                                collapsed={collapsed}
                                // icon={collapsed ? <MySmallIcon /> : <MyLargeIcon />}
                                text="AWT Project"
                              />
                            )}
                            render={({ items, logout, collapsed }) => {
                              return (
                                <>
                                  <div>Fake API</div>
                                  {items[0]}
                                  {items[1]}
                                  <div>AWT Django Backend</div>
                                  {items[2]}
                                  <div>Refine built-in</div>
                                  {items[3]}
                                  {items[4]}
                                  {logout}
                                </>
                              );
                            }}
                          />
                        )}
                      >
                        {/* Sider={CustomSider}> */}
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="todos" />}
                  />
                  <Route path="/todos">
                    <Route index element={<TodosList />} />
                    <Route path="create" element={<TodosCreate />} />
                    <Route path="edit/:id" element={<TodosEdit />} />
                    <Route path="show/:id" element={<TodosShow />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<UsersList />} />
                    <Route path="create" element={<UsersCreate />} />
                    <Route path="edit/:id" element={<UsersEdit />} />
                    <Route path="show/:id" element={<UsersShow />} />
                  </Route>
                  <Route path="/group">
                    <Route index element={<GroupList />} />
                    <Route path="create" element={<GroupCreate />} />
                    <Route path="edit/:id" element={<GroupEdit />} />
                    <Route path="show/:id" element={<GroupShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/blog_posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<CustomLogin />} />
                  {/* <Route path="/login" element={<Login />} />
                  <Route path="/custom-login" element={<CustomLogin />} /> */}
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            {/* <DevtoolsPanel /> */}
            {/* </DevtoolsProvider> */}
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
