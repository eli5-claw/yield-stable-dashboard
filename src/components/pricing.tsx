"use client";

import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PricingComparison() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">Pricing</Badge>
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start free and upgrade as you grow. All plans include access to our core yield data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-muted-foreground">Free</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              Perfect for exploring yield opportunities.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" />Top 10 stablecoins</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" />Hourly APY updates</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" />Basic risk metrics</li>
              <li className="flex items-center gap-2 text-muted-foreground"><X className="w-4 h-4" />Portfolio tracking</li>
              <li className="flex items-center gap-2 text-muted-foreground"><X className="w-4 h-4" />API access</li>
            </ul>
            <Button variant="outline" className="w-full mt-6">Get Started</Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border-emerald-500 shadow-lg">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-emerald-500">Most Popular</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-emerald-600">Pro</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              For serious yield farmers and DeFi analysts.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">88+ stablecoins</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">5-min APY updates</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">Portfolio tracking</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">Email + push alerts</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">1,000 API calls/mo</span></li>
            </ul>
            <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">Upgrade to Pro</Button>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-purple-600">Enterprise</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">Custom</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              For protocols, funds, and large teams.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">Unlimited stablecoins</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">Real-time data</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">Custom webhooks</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">Unlimited API</span></li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span className="font-medium">Dedicated support</span></li>
            </ul>
            <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
