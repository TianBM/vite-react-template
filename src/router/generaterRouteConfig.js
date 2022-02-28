import { set } from 'lodash-es';
import WrapSuspense from './WrapSuspense';

/**
 * 根据 pages 目录生成路径配置
 */
function generatePathConfig(){
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('/src/pages/**/$*.{js,jsx}');

  const pathConfig = {};

  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('/src/pages/', '')
      // 去除文件名后缀
      .replace(/.jsx?/, '')
      // 转换动态路由 $[foo].tsx => :foo
      .replace(/\$\[([\w-]+)]/, ':$1')
      // 转换以 $ 开头的文件
      .replace(/\$([\w-]+)/, '$1')
      // 以目录分隔
      .split('/');
    // 使用 lodash.set 合并为一个对象
    set(pathConfig, routePath, modules[filePath]);
  });
  return pathConfig;
}

/**
* 将文件路径配置映射为 react-router 路由
*/
function mapPathConfigToRoute(cfg){
 // route 的子节点为数组
 return Object.entries(cfg).map(([routePath, child]) => {
   // () => import() 语法判断
   if (typeof child === 'function') {
     // 等于 index 则映射为当前根路由
     const isIndex = routePath === 'index';
     return {
       index: isIndex,
       path: isIndex ? undefined : routePath,
       // 转换为组件
       element: WrapSuspense(child),
     };
   }
   // 否则为目录，则查找下一层级
   const { $, ...rest } = child;
   return {
     path: routePath,
     // layout 处理
     element: WrapSuspense($),
     // 递归 children
     children: mapPathConfigToRoute(rest),
   };
 });
}

/**
 * 生成react router v6的路由配置
 */
function generateRouteConfig(){
    const { $, ...pathConfig } = generatePathConfig();
    // 提取跟路由的 layout
    return [
      {
        path: '/',
        element: WrapSuspense($),
        children: mapPathConfigToRoute(pathConfig),
      },
    ];
}

const routeConfig = generateRouteConfig();

export default routeConfig;