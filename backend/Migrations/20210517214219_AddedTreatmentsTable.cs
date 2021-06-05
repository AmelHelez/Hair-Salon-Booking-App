using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class AddedTreatmentsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TreatmentId",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Treatments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treatments", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_TreatmentId",
                table: "Appointments",
                column: "TreatmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Treatments_TreatmentId",
                table: "Appointments",
                column: "TreatmentId",
                principalTable: "Treatments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Treatments_TreatmentId",
                table: "Appointments");

            migrationBuilder.DropTable(
                name: "Treatments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_TreatmentId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "TreatmentId",
                table: "Appointments");
        }
    }
}
