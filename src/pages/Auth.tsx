import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type FormValues = {
  email: string;
  password: string;
};

const Auth: React.FC = () => {
  const { signIn, signUp, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname ?? '/';

  const [mode, setMode] = React.useState<'sign-in' | 'sign-up'>('sign-in');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = React.useState(false);
  const [pendingEmail, setPendingEmail] = React.useState('');

  const methods = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  // Auto-redirect once user is authenticated
  useEffect(() => {
    if (session) {
      toast({ title: 'Signed in', description: 'Welcome back' });
      navigate(from, { replace: true });
    }
  }, [session, navigate, from, toast]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setEmailNotConfirmed(false);
    console.log('Form submitted:', { mode, email: values.email });
    try {
      if (mode === 'sign-in') {
        const result = await signIn(values.email, values.password);
        console.log('Sign in result:', result);
        // Session change detected by useEffect above
      } else {
        const result = await signUp(values.email, values.password);
        console.log('Sign up result:', result);
        toast({
          title: 'Account created',
          description: 'Check your email for a confirmation link to complete signup',
        });
        setPendingEmail(values.email);
        setMode('sign-in');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      const errorMsg = err?.message || err?.error_description || String(err);
      
      if (errorMsg.includes('Email not confirmed')) {
        setEmailNotConfirmed(true);
        setPendingEmail(values.email);
        toast({
          title: 'Email not confirmed',
          description: 'Please check your email and click the confirmation link',
        });
      } else {
        toast({
          title: 'Auth error',
          description: errorMsg,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendConfirmation = async () => {
    if (!pendingEmail) {
      toast({ title: 'Error', description: 'Email address not found' });
      return;
    }
    
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: pendingEmail,
      });
      
      if (error) throw error;
      
      toast({
        title: 'Confirmation sent',
        description: `Check ${pendingEmail} for the confirmation link`,
      });
    } catch (err: any) {
      toast({
        title: 'Error sending confirmation',
        description: err?.message || String(err),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-panel border rounded">
      <h2 className="text-2xl mb-4">{mode === 'sign-in' ? 'Sign In' : 'Sign Up'}</h2>
      
      {emailNotConfirmed && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning rounded text-sm">
          <p className="font-medium mb-2">Email confirmation pending</p>
          <p className="text-xs mb-3">
            We sent a confirmation link to <strong>{pendingEmail}</strong>. Please click it to activate your account.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={resendConfirmation}
            disabled={isSubmitting}
            className="w-full"
          >
            Resend confirmation email
          </Button>
        </div>
      )}

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...methods.register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="user@example.com"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                {...methods.register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                type="password"
                placeholder="••••••"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : mode === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in');
                setEmailNotConfirmed(false);
              }}
              disabled={isSubmitting}
            >
              {mode === 'sign-in' ? 'Create account' : 'Have an account? Sign in'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Auth;
