import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function CourseInfo() {
  return (
    <div className="container" style={{ width: 55 + '%', marginTop: 50, paddingBottom: 10 + '%' }}>

      <p className={styles.coursename_zh}>Computer System Engineering(Spring 2023)</p>
      <p className={styles.coursename_zh}>计算机系统设计综合实验(2023春)</p>

      <hr /><p className={styles.region_title}>课程信息</p>

      <p>时间：周三 3-4 节，10:10-12:00</p>
      <p>地点：仙II-319</p>

      <hr /><p className={styles.region_title}>实验内容</p>
      <ul className="index-list" style={{ marginBottom: 100 }}>
        <li><a href="docs/lab1/">实验 1：Android 和 APK</a></li>
        <li><a href="docs/lab2/">实验 2：静态分析</a></li>
        <li><a href="docs/lab3/">实验 3：动态分析</a></li>
        <li><a href="docs/lab4/">实验 4：位置信息调查</a></li>
      </ul>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Overview ${siteConfig.title}`}
    >
      <main>
        <CourseInfo />
      </main>
    </Layout>
  );
}
