import React from 'react';
import QueueAnim from 'rc-queue-anim';
import OnboardingWizard from './components/OnboardingWizard';
import './components/styles.scss';

const Stepper = () => (
  <div className="container-fluid container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title">新手上路</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1" className="mb-5"><OnboardingWizard /></div>
      </QueueAnim>
    </article>
  </div>
);

export default Stepper;
