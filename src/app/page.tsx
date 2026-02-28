"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, Search, Loader2, ExternalLink } from "lucide-react";

interface YieldPool {
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number;
  apyBase: number;
  apyReward: number;
  pool: string;
  stablecoin: boolean;
  poolMeta?: string;
}

export default function YieldDashboard() {
  const [pools, setPools] = useState<YieldPool[]>([]);
  const [filteredPools, setFilteredPools] = useState<YieldPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chainFilter, setChainFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"apy" | "tvl">("apy");

  useEffect(() => {
    fetchYieldData();
  }, []);

  useEffect(() => {
    filterAndSortPools();
  }, [pools, searchQuery, chainFilter, sortBy]);

  async function fetchYieldData() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://yields.llama.fi/pools');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter for stablecoins with meaningful TVL (>$100K)
      const stablePools = data.data.filter((pool: YieldPool) => 
        pool.stablecoin === true && 
        pool.tvlUsd > 100000
      );
      
      setPools(stablePools);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching yield data:', err);
    } finally {
      setLoading(false);
    }
  }

  function filterAndSortPools() {
    let filtered = [...pools];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pool =>
        pool.project.toLowerCase().includes(query) ||
        pool.symbol.toLowerCase().includes(query) ||
        pool.chain.toLowerCase().includes(query)
      );
    }

    // Chain filter
    if (chainFilter !== "all") {
      filtered = filtered.filter(pool => 
        pool.chain.toLowerCase() === chainFilter.toLowerCase()
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "apy") {
        return b.apy - a.apy;
      }
      return b.tvlUsd - a.tvlUsd;
    });

    setFilteredPools(filtered);
  }

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  const formatAPY = (apy: number) => {
    return `${apy.toFixed(2)}%`;
  };

  // Get unique chains for filter
  const chains = [...new Set(pools.map(p => p.chain))].sort();

  // Calculate stats
  const totalTvl = pools.reduce((sum, p) => sum + p.tvlUsd, 0);
  const avgApy = pools.length > 0 
    ? pools.reduce((sum, p) => sum + p.apy, 0) / pools.length 
    : 0;
  const topApy = pools.length > 0 ? Math.max(...pools.map(p => p.apy)) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-muted-foreground">Loading yield data from DeFiLlama...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchYieldData} className="w-full">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Yield Stable Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time yield data from DeFiLlama • {pools.length} pools tracked
            </p>
          </div>
          <Button variant="outline" onClick={fetchYieldData}>
            Refresh Data
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Value Locked</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(totalTvl)}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average APY</CardDescription>
              <CardTitle className="text-2xl">{formatAPY(avgApy)}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Top APY</CardDescription>
              <CardTitle className="text-2xl text-emerald-600">{formatAPY(topApy)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search protocol, token, or chain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={chainFilter} onValueChange={setChainFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Chains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chains</SelectItem>
                  {chains.map(chain => (
                    <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as "apy" | "tvl")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apy">Sort by APY</SelectItem>
                  <SelectItem value="tvl">Sort by TVL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Protocol</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Chain</TableHead>
                  <TableHead className="text-right">APY</TableHead>
                  <TableHead className="text-right">TVL</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPools.slice(0, 50).map((pool) => (
                  <TableRow key={pool.pool}>
                    <TableCell className="font-medium">{pool.project}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {pool.symbol}
                        {pool.poolMeta && (
                          <Badge variant="secondary" className="text-xs">
                            {pool.poolMeta}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{pool.chain}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-emerald-600">
                        {formatAPY(pool.apy)}
                      </span>
                      {pool.apy > 10 && (
                        <TrendingUp className="inline w-4 h-4 text-emerald-600 ml-1" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(pool.tvlUsd)}
                    </TableCell>
                    <TableCell className="text-right">
                      <a
                        href={`https://defillama.com/yields/pool/${pool.pool}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredPools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pools match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
