using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class ConnectedChatAndAppointment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppointmentId",
                table: "Chats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_AppointmentId",
                table: "Chats",
                column: "AppointmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Appointments_AppointmentId",
                table: "Chats",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Appointments_AppointmentId",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_AppointmentId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "AppointmentId",
                table: "Chats");
        }
    }
}
