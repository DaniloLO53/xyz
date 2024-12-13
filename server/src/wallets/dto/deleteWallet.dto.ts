import { IsNotEmpty } from 'class-validator';

export class DeleteWalletDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  walletId: string;
}
