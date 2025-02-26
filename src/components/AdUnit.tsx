'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical'
  style?: React.CSSProperties
}

export default function AdUnit({ adSlot, adFormat = 'auto', style }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client="ca-pub-2136823085558154"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  )
}