using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class AddedSalonTreatmentsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn(
               name: "Cost",
               table: "Treatments",
               newName: "Price");

            migrationBuilder.CreateTable(
                name: "SalonTreatment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SalonId = table.Column<int>(type: "int", nullable: false),
                    TreatmentId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalonTreatment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalonTreatment_Salons_SalonId",
                        column: x => x.SalonId,
                        principalTable: "Salons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SalonTreatment_Treatments_TreatmentId",
                        column: x => x.TreatmentId,
                        principalTable: "Treatments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SalonTreatment_SalonId",
                table: "SalonTreatment",
                column: "SalonId");

            migrationBuilder.CreateIndex(
                name: "IX_SalonTreatment_TreatmentId",
                table: "SalonTreatment",
                column: "TreatmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalonTreatment");

            migrationBuilder.AddColumn<int>(
                name: "Cost",
                table: "Treatments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
