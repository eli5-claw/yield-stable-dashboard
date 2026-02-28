import { yieldStables, formatCurrency, formatPercentage } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConnectButton } from "@/components/connect-button";
import { TrendingUp, TrendingDown, Search, Shield } from "lucide-react";

export default function Home() {
  const topApy = [...yieldStables].sort((a, b) => b.apy - a.apy).slice(0, 5);
  const totalTvl = yieldStables.reduce((sum, s) => sum + s.tvl, 0);
  const avgApy = yieldStables.reduce((sum, s) => sum + s.apy, 0) / yieldStables.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-950/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">YieldStable</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-emerald-600">Dashboard</a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600">Compare</a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600">Portfolio</a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600">API</a>
          </nav>
          <div className="flex items-center gap-3">
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Track 88+ Yield-Bearing Stablecoins
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Find the Best{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Stablecoin Yields
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Compare APYs across Aave, Compound, Curve, Ethena, and more. 
            Real-time data, risk metrics, and portfolio tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Explore Yields
            </Button>
            <Button size="lg" variant="outline">
              View API
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Value Locked</CardDescription>
              <CardTitle className="text-3xl">{formatCurrency(totalTvl)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Across {yieldStables.length} yield-bearing stablecoins
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average APY</CardDescription>
              <CardTitle className="text-3xl">{avgApy.toFixed(2)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Weighted average across all protocols
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Top Yield</CardDescription>
              <CardTitle className="text-3xl">{topApy[0]?.apy.toFixed(2)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {topApy[0]?.name} on {topApy[0]?.chain}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Yields */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Top Yields</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topApy.map((stable) => (
            <Card key={stable.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{stable.symbol}</CardTitle>
                  {stable.audited && (
                    <Shield className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <CardDescription>{stable.protocol}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">
                  {stable.apy.toFixed(2)}%
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  APY
                </p>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">TVL</span>
                    <span className="font-medium">{formatCurrency(stable.tvl)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Chain</span>
                    <Badge variant="outline" className="text-xs">
                      {stable.chain}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Full Table */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">All Yield-Bearing Stablecoins</h2>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search protocols..." className="pl-9" />
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Protocol</TableHead>
                  <TableHead>Chain</TableHead>
                  <TableHead className="text-right">APY</TableHead>
                  <TableHead className="text-right">TVL</TableHead>
                  <TableHead className="text-right">7d Change</TableHead>
                  <TableHead className="text-center">Audited</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yieldStables.map((stable) => (
                  <TableRow key={stable.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                    <TableCell>
                      <div>
                        <div className="font-medium">{stable.name}</div>
                        <div className="text-sm text-muted-foreground">{stable.symbol}</div>
                      </div>
                    </TableCell>
                    <TableCell>{stable.protocol}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{stable.chain}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-emerald-600">
                        {stable.apy.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(stable.tvl)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={`flex items-center justify-end gap-1 ${
                        stable.change7d >= 0 ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {stable.change7d >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {formatPercentage(stable.change7d)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {stable.audited ? (
                        <Shield className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 dark:bg-slate-950 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">YieldStable</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by Eli5DeFi • Data for educational purposes
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">API</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
