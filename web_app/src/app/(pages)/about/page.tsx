'use client';
import React from 'react';

import ContentCenterLayout from '@/components/center-content-layout';
import MT from '@/utils/MT';

export default function AboutPage() {
  return (
    <ContentCenterLayout>
      <MT.Typography
        placeholder={undefined}
        variant="h1"
        color="blue-gray"
        className="mb-4"
      >
        Contribution
      </MT.Typography>
      <MT.Typography variant="h4" color="blue-gray" placeholder={undefined}>
        1. Background: Opinion Search Engine (OSE)
      </MT.Typography>
      <MT.Typography variant="lead" color="blue-gray" placeholder={undefined}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        In today's digital world, there's an abundance of opinions on virtually
        every topic imaginable. However, navigating this vast sea of information
        can be daunting for users seeking specific viewpoints or sentiments on
        particular subjects. To address this challenge, the development of an
        Opinion Search Engine (OSE) with integrated sentiment analysis
        capabilities emerges as a solution. The primary goal of this project is
        to design and implement an OSE that enables users to efficiently find
        relevant opinions. The system will incorporate sentiment analysis
        algorithms to classify opinions as positive, negative, or neutral,
        providing users with valuable insights into public sentiment surrounding
        their queries. By harnessing the power of natural language processing
        (NLP) and machine learning techniques, the OSE aims to streamline the
        process of opinion discovery and analysis. Ultimately, this tool will
        empower users to make informed decisions, conduct comprehensive
        research, and gain deeper insights into public sentiment.
      </MT.Typography>
      <MT.Typography variant="h4" color="blue-gray" placeholder={undefined}>
        2. Selected Topic
      </MT.Typography>
      <MT.Typography variant="lead" color="blue-gray" placeholder={undefined}>
        The chosen topic for this project is virtual reality (VR) and augmented
        reality (AR), with a focus on AR/VR headsets. This topic was chosen
        because of its current popularity and the abundance of intriguing
        viewpoints associated with it. AR/VR technologies, especially headsets,
        have garnered significant attention in recent years due to their
        transformative potential across various industries such as gaming,
        entertainment, healthcare, and education. The rapidly evolving landscape
        of AR/VR headsets presents a rich source of diverse perspectives,
        insights, and discussions. By focusing on this topic, the project aims
        to present insights into opinions and sentiments surrounding AR/VR
        technologies as a whole, as well as specific AR/VR headsets. This
        analysis will provide valuable information for understanding user
        perceptions, preferences, and experiences within the AR/VR community on
        Reddit.
      </MT.Typography>
    </ContentCenterLayout>
  );
}
