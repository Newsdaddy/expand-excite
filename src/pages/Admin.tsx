import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Shield,
  Users,
  MessageSquare,
  LogOut,
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Admin emails that can access this page
const ADMIN_EMAILS = [
  "byeongjin.jeong@ecdb.com",
  "byeongjin.jeong05@gmail.com",
  "editorjin0326@gmail.com",
];

interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  message: string | null;
  created_at: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  company: string;
  job_title: string;
  phone: string | null;
  wants_consultation: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, signOut, setShowAuthModal, setAuthModalMode, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      // Fetch consultation requests
      const { data: consultData, error: consultError } = await supabase
        .from("consultation_requests")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("Consultations:", consultData, "Error:", consultError);

      if (consultError) {
        console.error("Consultation fetch error:", consultError);
      }
      if (consultData) {
        setConsultations(consultData);
      }

      // Fetch user profiles
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      console.log("Users:", userData, "Error:", userError);

      if (userError) {
        console.error("Users fetch error:", userError);
      }
      if (userData) {
        setUsers(userData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // AuthContext 로딩 중이면 로딩 스피너 표시
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">관리자 로그인 필요</h1>
          <p className="text-muted-foreground mb-4">관리자 계정으로 로그인해주세요.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setAuthModalMode('login'); setShowAuthModal(true); }}>
              로그인
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">홈으로</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">접근 권한 없음</h1>
          <p className="text-muted-foreground mb-4">관리자만 접근할 수 있습니다.</p>
          <Button variant="outline" asChild>
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ECDB Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    어드민 페이지에서 로그아웃됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={signOut}>로그아웃</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">컨설팅 신청</p>
                <p className="text-3xl font-bold">{consultations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">가입자</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            새로고침
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="consultations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="consultations" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              컨설팅 신청 ({consultations.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              가입자 ({users.length})
            </TabsTrigger>
          </TabsList>

          {/* Consultations Tab */}
          <TabsContent value="consultations">
            <div className="bg-card border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">신청일</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>회사</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>전화번호</TableHead>
                    <TableHead className="max-w-[300px]">요청사항</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        컨설팅 신청 내역이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    consultations.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-sm">{formatDate(item.created_at)}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.company}</TableCell>
                        <TableCell>
                          <a href={`mailto:${item.email}`} className="text-primary hover:underline">
                            {item.email}
                          </a>
                        </TableCell>
                        <TableCell>{item.phone || "-"}</TableCell>
                        <TableCell className="max-w-[300px] truncate" title={item.message || ""}>
                          {item.message || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="bg-card border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">가입일</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>회사</TableHead>
                    <TableHead>직함</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>전화번호</TableHead>
                    <TableHead className="text-center">상담 희망</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        가입자가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-sm">{formatDate(user.created_at)}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.company}</TableCell>
                        <TableCell>{user.job_title}</TableCell>
                        <TableCell>
                          <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                            {user.email}
                          </a>
                        </TableCell>
                        <TableCell>{user.phone || "-"}</TableCell>
                        <TableCell className="text-center">
                          {user.wants_consultation ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
