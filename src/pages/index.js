import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function MyContent() {
  return (
    <div className="container" style={{ width: 55 + '%', marginTop: 50, paddingBottom: 10 + '%' }}>

      <p className={styles.coursename_zh}>Computer System Engineering(Spring 2023)</p>
      <p className={styles.coursename_zh}>计算机系统设计综合实验(2023春)</p>

      <hr /><p className={styles.region_title}>课程信息</p>

      <p>时间：周三 3-4 节，10:10-12:00</p>
      <p>地点：仙II-319</p>

      <hr /><p className={styles.region_title}>实验内容</p>
      <ul class="index-list" style={{ marginBottom: 100 }}>
        <li><a href="docs/lab1/">实验 1：Android 和 APK</a></li>
        <li><a href="docs/lab2/">实验 2：静态分析</a></li>
        <li><a href="docs/lab3/">实验 3：动态分析</a></li>
        <li><a href="docs/lab4/">实验 4：位置信息调查</a></li>
      </ul>
    </div>
  );
}


export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Overview ${siteConfig.title}`}
    // description="Description will go into a meta tag in <head />"

    >
      {/* <HomepageHeader /> */}
      <main>
        {/* <HomepageFeatures /> */}
        <MyContent />
      </main>
    </Layout>
  );
}
