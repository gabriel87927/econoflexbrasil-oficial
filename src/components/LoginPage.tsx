import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha e-mail e senha.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  return (
    <section className="container py-6">
      {/* Breadcrumb */}
      <p className="text-sm text-muted-foreground mb-2">
        Início {">"} Minha Conta {">"} Login
      </p>

      <h1 className="text-2xl font-bold mb-6">Iniciar sessão</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">E-mail</label>
          <Input 
            type="email"
            placeholder="ex.: seuemail@email.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Senha</label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"}
              placeholder="ex.: suasenha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button type="button" className="text-sm underline text-muted-foreground">
            Esqueceu a senha?
          </button>
        </div>

        <Button type="submit" className="w-full bg-econoflex-dark hover:bg-econoflex-dark/90">
          Iniciar sessão
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Não possui uma conta ainda?{" "}
          <button type="button" className="underline text-foreground">
            Criar uma conta
          </button>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
