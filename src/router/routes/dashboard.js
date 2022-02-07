export default [
    {
      path: '/dashboard/administrador',
      name: 'dashboard-sadosa',
      component: () => import('@/views/dashboard/Admin.vue'),
      meta: {
        resource: 'Admin',
        action: 'read',
      },
    },
    {
        path: '/dashboard/estudiante',
        name: 'dashboard-estudiante',
        component: () => import('@/views/dashboard/Estudent.vue'),
        meta: {
          resource: 'Est',
          action: 'read',
        },
    },
    {
        path: '/dashboard/profesor',
        name: 'dashboard-profesor',
        component: () => import('@/views/dashboard/Profesor.vue'),
        meta: {
          resource: 'Pro',
          action: 'read',
        },
    },
    {
      path: '/dashboard/secretaria',
      name: 'dashboard-secretaria',
      component: () => import('@/views/dashboard/Secretaria.vue'),
      meta: {
        resource: 'Secr',
        action: 'read',
      },
   }
  ]
  