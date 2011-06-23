namespace COSMO2EOINIT
{
    partial class Main
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Main));
            this.initializeButton = new System.Windows.Forms.Button();
            this.tbDBHost = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.tbDBPort = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.tbNumOfForecastValues = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.tbDBUsername = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.tbDBPassword = new System.Windows.Forms.TextBox();
            this.label6 = new System.Windows.Forms.Label();
            this.tbSignalPrefix = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // initializeButton
            // 
            this.initializeButton.Location = new System.Drawing.Point(175, 434);
            this.initializeButton.Name = "initializeButton";
            this.initializeButton.Size = new System.Drawing.Size(107, 28);
            this.initializeButton.TabIndex = 0;
            this.initializeButton.Text = "Initialize/Update";
            this.initializeButton.UseVisualStyleBackColor = true;
            this.initializeButton.Click += new System.EventHandler(this.initializeButton_Click);
            // 
            // tbDBHost
            // 
            this.tbDBHost.Location = new System.Drawing.Point(181, 232);
            this.tbDBHost.Name = "tbDBHost";
            this.tbDBHost.Size = new System.Drawing.Size(182, 20);
            this.tbDBHost.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(72, 261);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(103, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "Oracle DB List. Port:";
            // 
            // tbDBPort
            // 
            this.tbDBPort.Location = new System.Drawing.Point(181, 258);
            this.tbDBPort.Name = "tbDBPort";
            this.tbDBPort.Size = new System.Drawing.Size(182, 20);
            this.tbDBPort.TabIndex = 2;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(43, 365);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(132, 13);
            this.label3.TabIndex = 6;
            this.label3.Text = "Number of Forcast Values:";
            // 
            // tbNumOfForecastValues
            // 
            this.tbNumOfForecastValues.Location = new System.Drawing.Point(181, 362);
            this.tbNumOfForecastValues.Name = "tbNumOfForecastValues";
            this.tbNumOfForecastValues.Size = new System.Drawing.Size(182, 20);
            this.tbNumOfForecastValues.TabIndex = 5;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(65, 287);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(110, 13);
            this.label4.TabIndex = 8;
            this.label4.Text = "Oracle DB Username:";
            // 
            // tbDBUsername
            // 
            this.tbDBUsername.Location = new System.Drawing.Point(181, 284);
            this.tbDBUsername.Name = "tbDBUsername";
            this.tbDBUsername.Size = new System.Drawing.Size(182, 20);
            this.tbDBUsername.TabIndex = 3;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(67, 313);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(108, 13);
            this.label5.TabIndex = 10;
            this.label5.Text = "Oracle DB Password:";
            // 
            // tbDBPassword
            // 
            this.tbDBPassword.Location = new System.Drawing.Point(181, 310);
            this.tbDBPassword.Name = "tbDBPassword";
            this.tbDBPassword.Size = new System.Drawing.Size(182, 20);
            this.tbDBPassword.TabIndex = 4;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(107, 391);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(68, 13);
            this.label6.TabIndex = 12;
            this.label6.Text = "Signal Prefix:";
            // 
            // tbSignalPrefix
            // 
            this.tbSignalPrefix.Location = new System.Drawing.Point(181, 388);
            this.tbSignalPrefix.Name = "tbSignalPrefix";
            this.tbSignalPrefix.Size = new System.Drawing.Size(182, 20);
            this.tbSignalPrefix.TabIndex = 6;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(91, 235);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(84, 13);
            this.label1.TabIndex = 13;
            this.label1.Text = "Oracle DB Host:";
            // 
            // textBox1
            // 
            this.textBox1.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBox1.Location = new System.Drawing.Point(12, 17);
            this.textBox1.Multiline = true;
            this.textBox1.Name = "textBox1";
            this.textBox1.ReadOnly = true;
            this.textBox1.Size = new System.Drawing.Size(268, 22);
            this.textBox1.TabIndex = 14;
            this.textBox1.TabStop = false;
            this.textBox1.Text = "Welcome to the Cosmo2EO intialization/update tool!";
            this.textBox1.TextChanged += new System.EventHandler(this.textBox1_TextChanged);
            // 
            // textBox2
            // 
            this.textBox2.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textBox2.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBox2.Location = new System.Drawing.Point(12, 50);
            this.textBox2.Multiline = true;
            this.textBox2.Name = "textBox2";
            this.textBox2.ReadOnly = true;
            this.textBox2.Size = new System.Drawing.Size(416, 120);
            this.textBox2.TabIndex = 15;
            this.textBox2.TabStop = false;
            this.textBox2.Text = resources.GetString("textBox2.Text");
            // 
            // textBox3
            // 
            this.textBox3.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textBox3.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBox3.Location = new System.Drawing.Point(12, 176);
            this.textBox3.Multiline = true;
            this.textBox3.Name = "textBox3";
            this.textBox3.ReadOnly = true;
            this.textBox3.Size = new System.Drawing.Size(416, 35);
            this.textBox3.TabIndex = 16;
            this.textBox3.TabStop = false;
            this.textBox3.Text = "If you are only getting error messages, change the names of your signals, the sig" +
                "nal prefix and try again!\r\n";
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(440, 474);
            this.Controls.Add(this.textBox3);
            this.Controls.Add(this.textBox2);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.tbSignalPrefix);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.tbDBPassword);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.tbDBUsername);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.tbNumOfForecastValues);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.tbDBPort);
            this.Controls.Add(this.tbDBHost);
            this.Controls.Add(this.initializeButton);
            this.Name = "Main";
            this.Text = "Cosmo2EO Initialization/Update";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button initializeButton;
        private System.Windows.Forms.TextBox tbDBHost;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox tbDBPort;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox tbNumOfForecastValues;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox tbDBUsername;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox tbDBPassword;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox tbSignalPrefix;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.TextBox textBox2;
        private System.Windows.Forms.TextBox textBox3;
    }
}

