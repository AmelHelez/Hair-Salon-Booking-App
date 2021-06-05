using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class SalonUserRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SalonId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_SalonId",
                table: "Users",
                column: "SalonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Salons_SalonId",
                table: "Users",
                column: "SalonId",
                principalTable: "Salons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Salons_SalonId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_SalonId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SalonId",
                table: "Users");
        }
    }
}
