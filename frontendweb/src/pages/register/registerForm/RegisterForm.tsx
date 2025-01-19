import { useForm } from 'react-hook-form';
import { registerDTO } from '@/utils/services/authService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AvailableRoutes } from '@/utils/router/availableRoutes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface RegisterFormProps {
  onSubmit: (data: registerDTO) => void;
  error?: string;
  isLoading?: boolean;
}

export default function RegisterForm({ onSubmit, error, isLoading }: RegisterFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<registerDTO>();

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                placeholder="John"
                {...register('name', {
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long',
                  },
                })}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                placeholder="Smith"
                {...register('lastname', {
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters long',
                  },
                })}
              />
              {errors.lastname && (
                <p className="text-sm text-destructive">{errors.lastname.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="login">Username</Label>
            <Input
              id="login"
              {...register('login', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters long',
                },
              })}
            />
            {errors.login && (
              <p className="text-sm text-destructive">{errors.login.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="123456789"
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{9,15}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to={AvailableRoutes.LOGIN}
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}