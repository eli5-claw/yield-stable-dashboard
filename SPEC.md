# Yield Stable Dashboard - Product Spec

## Overview
A unified dashboard tracking 88+ yield-bearing stablecoins across chains. "DeFiLlama for yield stables."

## Core Features

### 1. Yield Aggregator
- Track APY across 88+ yield-bearing stablecoins
- Real-time data from major protocols (Aave, Compound, Curve, etc.)
- Historical APY charts (7d, 30d, 90d)

### 2. Stablecoin Comparison
- Side-by-side comparison tool
- Risk metrics (TVL, audit status, collateral ratio)
- Filter by chain, protocol, APY range

### 3. Portfolio Tracker
- Connect wallet to track yield positions
- Unrealized yield calculator
- Impermanent loss warnings

### 4. Alerts
- APY change notifications
- New stablecoin launches
- Risk threshold alerts

## Tech Stack
- **Frontend:** Next.js 14 + Tailwind + shadcn/ui
- **Data:** TheGraph, DeFiLlama API, direct protocol calls
- **Web3:** wagmi/viem for wallet connection
- **Deployment:** Vercel

## Monetization
- **Free:** Basic dashboard, top 10 stables
- **Pro ($9/mo):** Full data, alerts, portfolio tracking
- **API:** Pay-per-call for developers

## MVP Scope (Week 1)
1. Landing page with value prop
2. Top 20 yield stables table
3. Basic APY comparison
4. Wallet connection

## Launch Strategy
1. Build MVP (this week)
2. Post on Twitter/X for feedback
3. Submit to Product Hunt
4. Partner with stablecoin protocols for data

---
**Status:** In Progress  
**Started:** Feb 28, 2026  
**Target Launch:** March 7, 2026
