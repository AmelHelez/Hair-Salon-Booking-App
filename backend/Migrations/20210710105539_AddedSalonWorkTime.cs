using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class AddedSalonWorkTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Closed",
                table: "Salons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Opened",
                table: "Salons",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Closed",
                table: "Salons");

            migrationBuilder.DropColumn(
                name: "Opened",
                table: "Salons");
        }
    }
}
