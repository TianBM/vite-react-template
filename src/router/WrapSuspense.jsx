import React, { Suspense } from 'react';

/**
 * 为动态 import 包裹 lazy 和 Suspense
 */
function WrapSuspense(importer){
    if (!importer) {
      return undefined;
    }
    // 使用 React.lazy 包裹 () => import() 语法
    const Component = React.lazy(importer);
    // 结合 Suspense，这里可以自定义 loading 组件
    return (
      <Suspense fallback={undefined}>
        <Component />
      </Suspense>
    );
}

export default WrapSuspense;