class CreateSearchcities < ActiveRecord::Migration[5.2]
  def change
    create_table :searchcities do |t|
      t.string :city
      t.string :country
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
